import { useState } from 'react'

const expectedHash = [
    '4a0687a8ca2e72a3f635d604b3bd5e4c3c65d0f8d39849d3cd3387033e30ff25',
    '9f75648e702e047f13fc8936bee0c8b8602998623e302b9a352c37d58bce3e9c'
]

async function sha256(text: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

type Attempt = {
    input: string
    hash: string
    success: boolean
}

export default function App() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [attempts, setAttempts] = useState<Attempt[]>([])

    const handleCheck = async () => {
        setLoading(true)
        setResult(null)

        const trimmed = input.trim()
        const hash = await sha256(trimmed)
        const success = expectedHash.includes(hash)

        setAttempts((prev) => [
            {
                input: trimmed,
                hash,
                success
            },
            ...prev
        ])

        if (success) {
            setResult('정답입니다.')
        } else {
            setResult('오답입니다.')
        }

        setLoading(false)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='w-full max-w-lg bg-white p-6 shadow'>
                <div className='mb-4'>
                    <div className='text-sm font-semibold mb-1'>대상 SHA-256</div>
                    <div className='text-xs break-all text-gray-600 space-y-1'>
                        {expectedHash[0]}
                    </div>
                </div>

                <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='문자열 입력'
                    className='w-full border px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className='w-full bg-blue-500 text-white py-2 hover:bg-blue-600 disabled:opacity-50'
                >
                    {loading ? '검증 중...' : '검증'}
                </button>

                {result && (
                    <div
                        className={`mt-4 text-center font-semibold ${
                            result === '정답입니다.' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {result}
                    </div>
                )}

                <div className='mt-6'>
                    <div className='text-sm font-semibold mb-2'>시도 기록</div>
                    <div className='max-h-60 overflow-y-auto text-xs space-y-2'>
                        {attempts.map((a, i) => (
                            <div
                                key={i}
                                className='border p-2 rounded bg-gray-50'
                            >
                                <div>입력: {a.input}</div>
                                <div className='break-all'>SHA256: {a.hash}</div>
                                <div
                                    className={
                                        a.success
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }
                                >
                                    {a.success ? '정답' : '오답'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
