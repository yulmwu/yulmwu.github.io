import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type LogType = 'system' | 'input' | 'ok' | 'error' | 'info' | 'sep'

type TerminalLog = {
    id: number
    type: LogType
    text: string
}

type TrainingStep = {
    phase: 'Switch' | 'Router' | 'ACL'
    prompt: string
    canonical: string
    explanation: string
    matcher: (input: string) => boolean
}

type SubnetInfo = {
    cidr: string
    subnetMask: string
    network: string
    broadcast: string
    hostRange: string
}

const MAX_RENDER_SUBNETS = 512

type MemoryField = {
    id: string
    label: string
    type: 'single' | 'range'
    answer?: string
    placeholder?: string
    startAnswer?: string
    endAnswer?: string
    startPlaceholder?: string
    endPlaceholder?: string
}

type MemorySection = {
    title: string
    fields: MemoryField[]
}

type MainTab = 'memory' | 'terminal' | 'cidr'

const normalizeCommand = (input: string) =>
    input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')

const normalizeMemoryText = (input: string) =>
    input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/\s*-\s*/g, '-')

const matchesAny = (input: string, patterns: RegExp[]) => {
    const normalized = normalizeCommand(input)
    return patterns.some((pattern) => pattern.test(normalized))
}

const memorySections: MemorySection[] = [
    {
        title: 'VLAN 10 교사망',
        fields: [
            { id: 'v10-cidr', label: 'CIDR', type: 'single', answer: '192.168.10.0/25', placeholder: '직접 입력' },
            {
                id: 'v10-mask',
                label: '서브넷 마스크',
                type: 'single',
                answer: '255.255.255.128',
                placeholder: '직접 입력',
            },
            {
                id: 'v10-network',
                label: '네트워크 주소',
                type: 'single',
                answer: '192.168.10.0',
                placeholder: '직접 입력',
            },
            {
                id: 'v10-broadcast',
                label: '브로드캐스트 주소',
                type: 'single',
                answer: '192.168.10.127',
                placeholder: '직접 입력',
            },
            {
                id: 'v10-host',
                label: '사용 가능한 IP 범위',
                type: 'range',
                startAnswer: '192.168.10.1',
                endAnswer: '192.168.10.126',
                startPlaceholder: '시작 IP',
                endPlaceholder: '끝 IP',
            },
        ],
    },
    {
        title: 'VLAN 20 학생망',
        fields: [
            {
                id: 'v20-cidr',
                label: 'CIDR',
                type: 'single',
                answer: '192.168.10.128/25',
                placeholder: '직접 입력',
            },
            {
                id: 'v20-mask',
                label: '서브넷 마스크',
                type: 'single',
                answer: '255.255.255.128',
                placeholder: '직접 입력',
            },
            {
                id: 'v20-network',
                label: '네트워크 주소',
                type: 'single',
                answer: '192.168.10.128',
                placeholder: '직접 입력',
            },
            {
                id: 'v20-broadcast',
                label: '브로드캐스트 주소',
                type: 'single',
                answer: '192.168.10.255',
                placeholder: '직접 입력',
            },
            {
                id: 'v20-host',
                label: '사용 가능한 IP 범위',
                type: 'range',
                startAnswer: '192.168.10.129',
                endAnswer: '192.168.10.254',
                startPlaceholder: '시작 IP',
                endPlaceholder: '끝 IP',
            },
        ],
    },
]

const steps: TrainingStep[] = [
    {
        phase: 'Switch',
        prompt: 'Switch>',
        canonical: 'en',
        explanation: 'enable 모드(권한 모드)로 진입합니다.',
        matcher: (input) => matchesAny(input, [/^en$/, /^enable$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch#',
        canonical: 'conf t',
        explanation: '전역 설정 모드로 들어갑니다. conf t는 configure terminal의 약자입니다.',
        matcher: (input) => matchesAny(input, [/^conf t$/, /^configure terminal$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config)#',
        canonical: 'vlan 10',
        explanation: 'VLAN 10 컨텍스트를 선택해 교사망 VLAN을 만들 준비를 합니다.',
        matcher: (input) => matchesAny(input, [/^vlan 10$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-vlan)#',
        canonical: 'name teacher',
        explanation: 'VLAN 10의 식별 이름을 teacher로 지정합니다.',
        matcher: (input) => matchesAny(input, [/^name teacher$/, /^na teacher$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config)#',
        canonical: 'vlan 20',
        explanation: 'VLAN 20 컨텍스트를 선택해 학생망 VLAN을 만듭니다.',
        matcher: (input) => matchesAny(input, [/^vlan 20$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-vlan)#',
        canonical: 'name student',
        explanation: 'VLAN 20의 식별 이름을 student로 지정합니다.',
        matcher: (input) => matchesAny(input, [/^name student$/, /^na student$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config)#',
        canonical: 'int range fa0/1-10',
        explanation: '교사망 포트 범위(1~10번)를 선택합니다.',
        matcher: (input) =>
            matchesAny(input, [/^(int|interface) range fa0\/1-10$/, /^(int|interface) range fastethernet0\/1-10$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if-range)#',
        canonical: 'sw mode acc',
        explanation: '선택한 포트를 Access 포트 모드로 설정합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^sw mode acc$/,
                /^sw mode access$/,
                /^switchport mode acc$/,
                /^switchport mode access$/,
                /^switchport mo acc$/,
                /^switchport mo access$/,
            ]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if-range)#',
        canonical: 'sw acc vlan 10',
        explanation: '선택 포트를 VLAN 10(교사망)에 할당합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^sw acc vlan 10$/,
                /^sw access vlan 10$/,
                /^switchport acc vlan 10$/,
                /^switchport access vlan 10$/,
                /^switchport ac vlan 10$/,
            ]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config)#',
        canonical: 'int range fa0/11-20',
        explanation: '학생망 포트 범위(11~20번)를 선택합니다.',
        matcher: (input) =>
            matchesAny(input, [/^(int|interface) range fa0\/11-20$/, /^(int|interface) range fastethernet0\/11-20$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if-range)#',
        canonical: 'sw mode acc',
        explanation: '학생망 포트도 Access 포트 모드로 설정합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^sw mode acc$/,
                /^sw mode access$/,
                /^switchport mode acc$/,
                /^switchport mode access$/,
                /^switchport mo acc$/,
                /^switchport mo access$/,
            ]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if-range)#',
        canonical: 'sw acc vlan 20',
        explanation: '학생망 포트를 VLAN 20에 할당합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^sw acc vlan 20$/,
                /^sw access vlan 20$/,
                /^switchport acc vlan 20$/,
                /^switchport access vlan 20$/,
                /^switchport ac vlan 20$/,
            ]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config)#',
        canonical: 'int fa0/24',
        explanation: '스위치-라우터 연결용 Trunk 포트(FA0/24)를 선택합니다.',
        matcher: (input) => matchesAny(input, [/^(int|interface) fa0\/24$/, /^(int|interface) fastethernet0\/24$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if)#',
        canonical: 'sw mode trunk',
        explanation: '포트를 Trunk 모드로 바꿔 여러 VLAN 태그를 통과시킵니다.',
        matcher: (input) => matchesAny(input, [/^sw mode trunk$/, /^switchport mode trunk$/]),
    },
    {
        phase: 'Switch',
        prompt: 'Switch(config-if)#',
        canonical: 'sw trunk allowed vlan 10,20',
        explanation: '이 Trunk 링크에서 VLAN 10, 20만 통과하도록 제한합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^sw trunk allowed vlan 10,20$/,
                /^switchport trunk allowed vlan 10,20$/,
                /^switchport trunk all vlan 10,20$/,
            ]),
    },
    {
        phase: 'Router',
        prompt: 'Router>',
        canonical: 'en',
        explanation: '라우터에서 권한 모드로 진입합니다.',
        matcher: (input) => matchesAny(input, [/^en$/, /^enable$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router#',
        canonical: 'conf t',
        explanation: '라우터 전역 설정 모드로 진입합니다.',
        matcher: (input) => matchesAny(input, [/^conf t$/, /^configure terminal$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config)#',
        canonical: 'int fa0/0',
        explanation: '라우터의 물리 인터페이스 FA0/0을 선택합니다.',
        matcher: (input) => matchesAny(input, [/^(int|interface) fa0\/0$/, /^(int|interface) fastethernet0\/0$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config-if)#',
        canonical: 'no sh',
        explanation: '인터페이스를 활성화(no shutdown)합니다.',
        matcher: (input) => matchesAny(input, [/^no sh$/, /^no shut$/, /^no shutdown$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config)#',
        canonical: 'int fa0/0.10',
        explanation: '서브인터페이스 .10(VLAN 10용)을 선택합니다.',
        matcher: (input) =>
            matchesAny(input, [/^(int|interface) fa0\/0\.10$/, /^(int|interface) fastethernet0\/0\.10$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config-subif)#',
        canonical: 'enc dot1Q 10',
        explanation: '802.1Q 태그로 VLAN 10 캡슐화를 지정합니다.',
        matcher: (input) => matchesAny(input, [/^enc dot1q 10$/, /^encapsulation dot1q 10$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config-subif)#',
        canonical: 'ip address 192.168.10.126 255.255.255.128',
        explanation: 'VLAN 10의 게이트웨이(192.168.10.126/25)를 설정합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^ip address 192\.168\.10\.126 255\.255\.255\.128$/,
                /^ip add 192\.168\.10\.126 255\.255\.255\.128$/,
            ]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config)#',
        canonical: 'int fa0/0.20',
        explanation: '서브인터페이스 .20(VLAN 20용)을 선택합니다.',
        matcher: (input) =>
            matchesAny(input, [/^(int|interface) fa0\/0\.20$/, /^(int|interface) fastethernet0\/0\.20$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config-subif)#',
        canonical: 'enc dot1Q 20',
        explanation: '802.1Q 태그로 VLAN 20 캡슐화를 지정합니다.',
        matcher: (input) => matchesAny(input, [/^enc dot1q 20$/, /^encapsulation dot1q 20$/]),
    },
    {
        phase: 'Router',
        prompt: 'Router(config-subif)#',
        canonical: 'ip address 192.168.10.254 255.255.255.128',
        explanation: 'VLAN 20의 게이트웨이(192.168.10.254/25)를 설정합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^ip address 192\.168\.10\.254 255\.255\.255\.128$/,
                /^ip add 192\.168\.10\.254 255\.255\.255\.128$/,
            ]),
    },
    {
        phase: 'ACL',
        prompt: 'Router(config)#',
        canonical: 'access-list 100 deny ip 192.168.10.128 0.0.0.127 192.168.10.0 0.0.0.127',
        explanation: 'Extended ACL 100에서 학생망 -> 교사망으로 가는 모든 IP 트래픽을 먼저 차단합니다.',
        matcher: (input) =>
            matchesAny(input, [
                /^access-list 100 deny ip 192\.168\.10\.128 0\.0\.0\.127 192\.168\.10\.0 0\.0\.0\.127$/,
                /^access-l 100 deny ip 192\.168\.10\.128 0\.0\.0\.127 192\.168\.10\.0 0\.0\.0\.127$/,
                /^acc-list 100 deny ip 192\.168\.10\.128 0\.0\.0\.127 192\.168\.10\.0 0\.0\.0\.127$/,
            ]),
    },
    {
        phase: 'ACL',
        prompt: 'Router(config)#',
        canonical: 'access-list 100 permit ip any any',
        explanation: '앞선 deny 조건 외의 나머지 트래픽은 모두 허용합니다.',
        matcher: (input) =>
            matchesAny(input, [/^access-list 100 permit ip any any$/, /^access-l 100 permit ip any any$/, /^acc-list 100 permit ip any any$/]),
    },
    {
        phase: 'ACL',
        prompt: 'Router(config)#',
        canonical: 'int fa0/0.20',
        explanation: 'ACL을 적용할 학생망 인터페이스를 다시 선택합니다.',
        matcher: (input) =>
            matchesAny(input, [/^(int|interface) fa0\/0\.20$/, /^(int|interface) fastethernet0\/0\.20$/]),
    },
    {
        phase: 'ACL',
        prompt: 'Router(config-subif)#',
        canonical: 'ip access-group 100 in',
        explanation: 'ACL 100을 ingress 방향(in)으로 적용해 유입 트래픽을 필터링합니다.',
        matcher: (input) => matchesAny(input, [/^ip access-group 100 in$/, /^ip access-g 100 in$/, /^ip acc-g 100 in$/]),
    },
]

const maskFromPrefix = (prefix: number) => {
    if (prefix === 0) return 0
    return (0xffffffff << (32 - prefix)) >>> 0
}

const intToIp = (num: number) => `${(num >>> 24) & 255}.${(num >>> 16) & 255}.${(num >>> 8) & 255}.${num & 255}`

const ipToInt = (ip: string) => {
    const parts = ip.split('.')
    if (parts.length !== 4) return null

    const nums = parts.map((part) => Number(part))
    if (nums.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return null

    return (((nums[0] << 24) >>> 0) | ((nums[1] << 16) >>> 0) | ((nums[2] << 8) >>> 0) | (nums[3] >>> 0)) >>> 0
}

const buildSubnetInfo = (networkInt: number, prefix: number): SubnetInfo => {
    const mask = maskFromPrefix(prefix)
    const broadcast = (networkInt | (~mask >>> 0)) >>> 0
    const hasHosts = prefix <= 30

    const firstHost = hasHosts ? networkInt + 1 : networkInt
    const lastHost = hasHosts ? broadcast - 1 : broadcast

    return {
        cidr: `${intToIp(networkInt)}/${prefix}`,
        subnetMask: intToIp(mask),
        network: intToIp(networkInt),
        broadcast: intToIp(broadcast),
        hostRange: `${intToIp(firstHost)} - ${intToIp(lastHost)}`,
    }
}

export default function Event0422() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [terminalFullscreen, setTerminalFullscreen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [commandInput, setCommandInput] = useState('')
    const [awaitingChoice, setAwaitingChoice] = useState(false)
    const [logs, setLogs] = useState<TerminalLog[]>([
        {
            id: 1,
            type: 'system',
            text: '명령어를 순서대로 입력하세요. int / interface와 같이 약어도 허용됩니다.',
        },
    ])

    const [memoryInputs, setMemoryInputs] = useState<Record<string, string>>({})
    const [memoryChecked, setMemoryChecked] = useState(false)
    const [memoryReveal, setMemoryReveal] = useState(false)

    const [baseCidrInput, setBaseCidrInput] = useState('192.168.10.0/24')
    const [splitPrefixInput, setSplitPrefixInput] = useState('25')
    const [appliedBaseCidr, setAppliedBaseCidr] = useState('192.168.10.0/24')
    const [appliedSplitPrefix, setAppliedSplitPrefix] = useState('25')
    const [showCidrResult, setShowCidrResult] = useState(false)

    const logContainerRef = useRef<HTMLDivElement | null>(null)
    const normalTerminalInputRef = useRef<HTMLInputElement | null>(null)
    const fullscreenTerminalInputRef = useRef<HTMLInputElement | null>(null)

    const activeStep = steps[currentStep]
    const completed = currentStep >= steps.length
    const progress = Math.round((currentStep / steps.length) * 100)
    const tabParam = searchParams.get('tab')
    const activeTab: MainTab =
        tabParam === 'memory' || tabParam === 'terminal' || tabParam === 'cidr'
            ? tabParam
            : 'memory'

    const setActiveTab = (tab: MainTab) => {
        const next = new URLSearchParams(searchParams)
        next.set('tab', tab)
        setSearchParams(next)
    }

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs, awaitingChoice, completed])

    useEffect(() => {
        if (!awaitingChoice || completed) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === '1' || event.code === 'Numpad1') {
                event.preventDefault()
                handleRetry()
                return
            }

            if (event.key === '2' || event.code === 'Numpad2') {
                event.preventDefault()
                handleRevealAndNext()
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [awaitingChoice, completed])

    useEffect(() => {
        if (activeTab !== 'terminal' || awaitingChoice || completed) return

        const targetInput = terminalFullscreen ? fullscreenTerminalInputRef.current : normalTerminalInputRef.current

        targetInput?.focus()
    }, [activeTab, terminalFullscreen, awaitingChoice, completed, currentStep])

    const memoryFieldState = useMemo(() => {
        const state: Record<string, boolean> = {}

        for (const section of memorySections) {
            for (const field of section.fields) {
                if (field.type === 'single') {
                    state[field.id] =
                        normalizeMemoryText(memoryInputs[field.id] ?? '') === normalizeMemoryText(field.answer ?? '')
                    continue
                }

                const startKey = `${field.id}-start`
                const endKey = `${field.id}-end`
                const startOk =
                    normalizeMemoryText(memoryInputs[startKey] ?? '') === normalizeMemoryText(field.startAnswer ?? '')
                const endOk =
                    normalizeMemoryText(memoryInputs[endKey] ?? '') === normalizeMemoryText(field.endAnswer ?? '')
                state[field.id] = startOk && endOk
            }
        }

        return state
    }, [memoryInputs])

    const memoryScore = useMemo(() => {
        const total = memorySections.reduce((sum, section) => sum + section.fields.length, 0)
        const correct = Object.values(memoryFieldState).filter(Boolean).length
        return { correct, total }
    }, [memoryFieldState])

    const cidrResult = useMemo(() => {
        const [ip, prefixRaw] = appliedBaseCidr.split('/')
        const basePrefix = Number(prefixRaw)
        const targetPrefix = Number(appliedSplitPrefix)

        if (!ip || Number.isNaN(basePrefix) || basePrefix < 0 || basePrefix > 32) {
            return { error: '기준 CIDR 형식이 올바르지 않습니다. 예: 192.168.10.0/24' }
        }

        if (Number.isNaN(targetPrefix) || targetPrefix < 0 || targetPrefix > 32) {
            return { error: '분할 Prefix는 0~32 범위여야 합니다.' }
        }

        if (targetPrefix < basePrefix) {
            return { error: '분할 Prefix는 기준 Prefix 이상이어야 합니다.' }
        }

        const ipInt = ipToInt(ip)
        if (ipInt === null) {
            return { error: 'IP 주소 형식이 잘못되었습니다.' }
        }

        const baseMask = maskFromPrefix(basePrefix)
        const baseNetwork = (ipInt & baseMask) >>> 0

        const subnetCount = 2 ** (targetPrefix - basePrefix)
        if (subnetCount > MAX_RENDER_SUBNETS) {
            return {
                error: `분할 개수가 너무 많습니다 (${subnetCount}개). Prefix 차이를 줄여 ${MAX_RENDER_SUBNETS}개 이하로 계산하세요.`,
            }
        }

        const subnetSize = 2 ** (32 - targetPrefix)
        const subnets = Array.from({ length: subnetCount }, (_, idx) =>
            buildSubnetInfo(baseNetwork + subnetSize * idx, targetPrefix),
        )

        return {
            base: buildSubnetInfo(baseNetwork, basePrefix),
            subnetCount,
            subnets,
        }
    }, [appliedBaseCidr, appliedSplitPrefix])

    const pushLog = (type: LogType, text: string) => {
        setLogs((prev) => [...prev, { id: prev.length + 1, type, text }])
    }

    const pushInputLog = (text: string) => {
        setLogs((prev) => {
            const next = [...prev]
            if (next.length > 0 && next[next.length - 1].type !== 'sep') {
                next.push({ id: next.length + 1, type: 'sep', text: '' })
            }
            next.push({ id: next.length + 1, type: 'input', text })
            return next
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (completed || awaitingChoice || !activeStep) return

        const rawInput = commandInput.trim()
        if (!rawInput) return

        pushInputLog(`${activeStep.prompt} ${rawInput}`)

        if (activeStep.matcher(rawInput)) {
            pushLog('ok', `정답: ${activeStep.explanation}`)
            setCurrentStep((prev) => prev + 1)
            setCommandInput('')
            return
        }

        pushLog('error', '오답: 명령어가 일치하지 않습니다. 다시 시도하거나 정답 확인을 선택하세요.')
        setAwaitingChoice(true)
    }

    const handleRetry = () => {
        setAwaitingChoice(false)
        setCommandInput('')
        pushLog('info', '재시도 모드로 전환했습니다.')
    }

    const handleRevealAndNext = () => {
        if (!activeStep) return

        pushLog('info', `정답 확인: ${activeStep.canonical}`)
        pushLog('ok', `해설: ${activeStep.explanation}`)
        setAwaitingChoice(false)
        setCommandInput('')
        setCurrentStep((prev) => prev + 1)
    }

    const handleReset = () => {
        setCurrentStep(0)
        setAwaitingChoice(false)
        setCommandInput('')
        setLogs([])
    }

    const logColor: Record<LogType, string> = {
        system: 'text-slate-300',
        input: 'text-cyan-300',
        ok: 'text-emerald-300',
        error: 'text-rose-300',
        info: 'text-amber-300',
        sep: '',
    }

    const renderSubnetCard = (title: string, data: SubnetInfo) => (
        <div className='rounded-lg border border-slate-200 bg-white p-4 text-sm'>
            <h4 className='mb-2 font-semibold text-slate-800'>{title}</h4>
            <div className='space-y-1 text-slate-700'>
                <p>
                    CIDR: <span className='font-mono'>{data.cidr}</span>
                </p>
                <p>
                    서브넷 마스크: <span className='font-mono'>{data.subnetMask}</span>
                </p>
                <p>
                    네트워크 주소: <span className='font-mono'>{data.network}</span>
                </p>
                <p>
                    브로드캐스트 주소: <span className='font-mono'>{data.broadcast}</span>
                </p>
                <p>
                    사용 가능한 IP 범위: <span className='font-mono'>{data.hostRange}</span>
                </p>
            </div>
        </div>
    )

    const renderTerminalPanel = (mode: 'normal' | 'fullscreen') => {
        const isFullscreen = mode === 'fullscreen'
        return (
            <div
                className={`bg-slate-950 text-sm text-slate-100 ${
                    isFullscreen ? 'flex h-full min-h-0 flex-col p-3 sm:p-4' : 'rounded-lg p-4'
                }`}
            >
                <div className='mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400'>
                    {completed || !activeStep ? <span className='text-emerald-300'>모든 단계 완료</span> : null}
                </div>

                <div
                    ref={logContainerRef}
                    className={`overflow-y-auto rounded border border-slate-800 bg-black/40 p-3 font-mono ${
                        isFullscreen ? 'min-h-0 flex-1' : 'h-[36rem]'
                    }`}
                >
                    {logs.map((log) =>
                        log.type === 'sep' ? (
                            <div key={log.id} className='h-3' />
                        ) : (
                            <p key={log.id} className={`mb-1 whitespace-pre-wrap ${logColor[log.type]}`}>
                                {log.text}
                            </p>
                        ),
                    )}
                    {completed && (
                        <p className='mt-3 text-emerald-300'>
                            모든 명령어를 올바르게 입력했습니다!!
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className='mt-4 space-y-3'>
                    <input
                        ref={isFullscreen ? fullscreenTerminalInputRef : normalTerminalInputRef}
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        disabled={completed || awaitingChoice}
                        placeholder='예: conf t'
                        className='w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-slate-100 outline-none ring-emerald-500 placeholder:text-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                    <button
                        type='submit'
                        disabled={completed || awaitingChoice}
                        className='w-full rounded-md bg-emerald-600 px-3 py-2 font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-600'
                    >
                        정답 확인
                    </button>
                </form>

                {awaitingChoice && !completed && (
                    <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                        <button
                            type='button'
                            onClick={handleRetry}
                            className='rounded-md border border-amber-400 bg-amber-500/10 px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/20'
                        >
                            다시 시도하기
                        </button>
                        <button
                            type='button'
                            onClick={handleRevealAndNext}
                            className='rounded-md border border-sky-400 bg-sky-500/10 px-3 py-2 text-sm text-sky-300 hover:bg-sky-500/20'
                        >
                            정답 보고 넘어가기
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <main className='min-h-screen bg-slate-100 px-4 py-8 text-slate-900'>
            <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
                <section className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
                    <p className='mt-2 text-sm text-slate-600'>
                        기준 CIDR: <span className='font-mono'>192.168.10.0/24</span>
                    </p>

                    <div className='mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3'>
                        <button
                            type='button'
                            onClick={() => setActiveTab('memory')}
                            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                                activeTab === 'memory'
                                    ? 'bg-slate-900 text-white'
                                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            IP 암기표
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('terminal')}
                            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                                activeTab === 'terminal'
                                    ? 'bg-slate-900 text-white'
                                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            명령어 터미널
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('cidr')}
                            className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                                activeTab === 'cidr'
                                    ? 'bg-slate-900 text-white'
                                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            CIDR 계산기
                        </button>
                    </div>
                </section>

                {activeTab === 'memory' && (
                    <section className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
                        <div className='flex flex-wrap gap-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    setMemoryChecked(true)
                                    setMemoryReveal(false)
                                }}
                                className='rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500'
                            >
                                표 채점하기
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setMemoryChecked(true)
                                    setMemoryReveal(true)
                                }}
                                className='rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
                            >
                                정답 보기
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setMemoryInputs({})
                                    setMemoryChecked(false)
                                    setMemoryReveal(false)
                                }}
                                className='rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-100'
                            >
                                표 초기화
                            </button>
                        </div>

                        {memoryChecked && (
                            <p className='mt-3 text-sm font-semibold text-slate-700'>
                                암기 점수: {memoryScore.correct} / {memoryScore.total}
                            </p>
                        )}

                        <div className='mt-4 grid gap-4 lg:grid-cols-2'>
                            {memorySections.map((section) => (
                                <div key={section.title} className='rounded-lg border border-slate-200 bg-slate-50 p-4'>
                                    <h3 className='mb-3 font-semibold'>{section.title}</h3>
                                    <div className='space-y-3'>
                                        {section.fields.map((field) => {
                                            const isCorrect = memoryFieldState[field.id]
                                            return (
                                                <div key={field.id}>
                                                    <div className='mb-1 flex items-center justify-between text-sm'>
                                                        <label className='font-medium text-slate-700'>
                                                            {field.label}
                                                        </label>
                                                        {memoryChecked && (
                                                            <span
                                                                className={`text-xs font-semibold ${
                                                                    isCorrect ? 'text-emerald-600' : 'text-rose-600'
                                                                }`}
                                                            >
                                                                {isCorrect ? '정답' : '오답'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {field.type === 'single' ? (
                                                        <>
                                                            <input
                                                                value={memoryInputs[field.id] ?? ''}
                                                                onChange={(e) =>
                                                                    setMemoryInputs((prev) => ({
                                                                        ...prev,
                                                                        [field.id]: e.target.value,
                                                                    }))
                                                                }
                                                                placeholder={field.placeholder}
                                                                autoComplete='off'
                                                                className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm outline-none ring-blue-400 focus:ring-2'
                                                            />
                                                            {memoryReveal && (
                                                                <p className='mt-1 text-xs text-slate-600'>
                                                                    정답:{' '}
                                                                    <span className='font-mono'>{field.answer}</span>
                                                                </p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
                                                                <input
                                                                    value={memoryInputs[`${field.id}-start`] ?? ''}
                                                                    onChange={(e) =>
                                                                        setMemoryInputs((prev) => ({
                                                                            ...prev,
                                                                            [`${field.id}-start`]: e.target.value,
                                                                        }))
                                                                    }
                                                                    placeholder={field.startPlaceholder}
                                                                    autoComplete='off'
                                                                    className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm outline-none ring-blue-400 focus:ring-2'
                                                                />
                                                                <span className='text-slate-500'>-</span>
                                                                <input
                                                                    value={memoryInputs[`${field.id}-end`] ?? ''}
                                                                    onChange={(e) =>
                                                                        setMemoryInputs((prev) => ({
                                                                            ...prev,
                                                                            [`${field.id}-end`]: e.target.value,
                                                                        }))
                                                                    }
                                                                    placeholder={field.endPlaceholder}
                                                                    autoComplete='off'
                                                                    className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm outline-none ring-blue-400 focus:ring-2'
                                                                />
                                                            </div>
                                                            {memoryReveal && (
                                                                <p className='mt-1 text-xs text-slate-600'>
                                                                    정답:{' '}
                                                                    <span className='font-mono'>
                                                                        {field.startAnswer} - {field.endAnswer}
                                                                    </span>
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'terminal' && (
                    <section className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
                        <div className='mb-4 flex flex-wrap items-center justify-between gap-2 text-sm'>
                            <div>
                                진행률: <span className='font-semibold'>{progress}%</span> ({currentStep}/{steps.length}
                                )
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                <button
                                    type='button'
                                    onClick={handleReset}
                                    className='rounded-md border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-100'
                                >
                                    처음부터
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setTerminalFullscreen(true)}
                                    className='rounded-md bg-slate-900 px-3 py-1 font-semibold text-white hover:bg-slate-700'
                                >
                                    전체 화면
                                </button>
                            </div>
                        </div>

                        <div className='mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200'>
                            <div
                                className='h-full rounded-full bg-emerald-500 transition-all'
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {renderTerminalPanel('normal')}
                    </section>
                )}

                {activeTab === 'cidr' && (
                    <section className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
                        <h2 className='text-lg font-semibold'>CIDR 계산기</h2>

                        <div className='mt-4 grid gap-3 text-sm md:grid-cols-2'>
                            <label className='block'>
                                <span className='mb-1 block text-slate-700'>기준 CIDR</span>
                                <input
                                    value={baseCidrInput}
                                    onChange={(e) => setBaseCidrInput(e.target.value)}
                                    className='w-full rounded-md border border-slate-300 px-3 py-2 font-mono outline-none ring-blue-400 focus:ring-2'
                                    placeholder='192.168.10.0/24'
                                    autoComplete='off'
                                />
                            </label>
                            <label className='block'>
                                <span className='mb-1 block text-slate-700'>분할 Prefix</span>
                                <input
                                    value={splitPrefixInput}
                                    onChange={(e) => setSplitPrefixInput(e.target.value)}
                                    className='w-full rounded-md border border-slate-300 px-3 py-2 font-mono outline-none ring-blue-400 focus:ring-2'
                                    placeholder='25'
                                    autoComplete='off'
                                />
                            </label>
                        </div>

                        <button
                            type='button'
                            onClick={() => {
                                setAppliedBaseCidr(baseCidrInput)
                                setAppliedSplitPrefix(splitPrefixInput)
                                setShowCidrResult(true)
                            }}
                            className='mt-4 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700'
                        >
                            계산하기
                        </button>

                        {showCidrResult && (
                            <>
                                {'error' in cidrResult ? (
                                    <div className='mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
                                        {cidrResult.error}
                                    </div>
                                ) : (
                                    <div className='mt-4 space-y-3'>
                                        <div className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm'>
                                            <p className='font-semibold text-slate-800'>기준 네트워크</p>
                                            <p className='mt-1 font-mono text-slate-700'>{cidrResult.base.cidr}</p>
                                        </div>
                                        <div className='rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm'>
                                            <p className='font-semibold text-slate-800'>분할 개수</p>
                                            <p className='mt-1 font-mono text-slate-700'>{cidrResult.subnetCount}개</p>
                                        </div>
                                        <div className='grid gap-3 lg:grid-cols-2'>
                                            {cidrResult.subnets.map((subnet, index) =>
                                                renderSubnetCard(`서브넷 ${index + 1}`, subnet),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}

                {activeTab === 'terminal' && terminalFullscreen && (
                    <div className='fixed inset-0 z-50 bg-slate-950'>
                        <div className='flex h-full w-full flex-col'>
                            <div className='flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 bg-slate-900 px-3 py-3 text-sm text-slate-100 sm:px-4'>
                                <p className='font-semibold'>터미널 전체 화면 모드</p>
                                <div className='flex flex-wrap gap-2'>
                                    <button
                                        type='button'
                                        onClick={handleReset}
                                        className='rounded-md border border-slate-500 px-3 py-1 text-slate-100 hover:bg-slate-800'
                                    >
                                        처음부터
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setTerminalFullscreen(false)}
                                        className='rounded-md bg-white px-3 py-1 font-semibold text-slate-900 hover:bg-slate-200'
                                    >
                                        전체 화면 종료
                                    </button>
                                </div>
                            </div>
                            <div className='min-h-0 flex-1'>{renderTerminalPanel('fullscreen')}</div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
