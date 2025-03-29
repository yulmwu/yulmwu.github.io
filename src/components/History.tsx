import { motion } from 'framer-motion'
import HistoryFields from './HistoryField'
import { useInView } from 'react-intersection-observer'
import Title from './components/Title'

interface HistoryProps {
    className?: string
}

const History = ({ className }: HistoryProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div
            id='work'
            className={`md:pl-20 md:pr-20 p-4 py-14 ${className}`}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <Title title='약력 & 기타 사항' iconSrc='/emojis/history.svg' />
            <HistoryFields date={new Date('2008-04-22')} title='Welcome, World!' />
            <HistoryFields date={new Date('2023-09-20')} title='정보처리기능사 취득' />
            <HistoryFields date={new Date('2024-01-05')} title='영원중학교 졸업'>
                <ul className='mt-4 text-gray-600 dark:text-gray-300 list-disc pl-6 text-[15px] sm:text-[17px] md:text-[20px]'>
                    <li>
                        <span className='text-purple-500 dark:text-purple-300 mr-2'>중학교 1~3학년</span> 3년 개근
                    </li>
                </ul>
            </HistoryFields>
            <HistoryFields date={new Date('2024-03-01')} title='세명컴퓨터고등학교 입학'>
                <ul className='mt-4 text-gray-600 dark:text-gray-300 list-disc pl-6 text-[15px] sm:text-[17px] md:text-[20px]'>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 1학기 학급 회장
                    </li>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 방송부 엔지니어
                    </li>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 교과우수상
                        <span className='text-[10px] sm:text-[12px] md:text-[15px]'>(음악, 프로그래밍, 컴퓨터 보안, 정보 처리와 관리)</span>
                    </li>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 학과 코딩 챌린지
                        <span className='text-[10px] sm:text-[12px] md:text-[15px]'>(1, 2학기 은상)</span>
                    </li>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 선행상
                    </li>
                    <li>
                        <span className='text-red-400 dark:text-red-300 mr-2'>고등학교 1학년</span> 개근
                    </li>
                    <li>
                        <span className='text-green-500 dark:text-green-300 mr-2'>고등학교 2학년</span> 1학기 학급 회장
                    </li>
                    <li>
                        <span className='text-green-500 dark:text-green-300 mr-2'>고등학교 2학년</span> 전공 동아리{' '}
                        <span className='text-purple-400 dark:text-purple-300'>널포유(Null4U)</span> 가입
                    </li>
                </ul>
            </HistoryFields>
        </motion.div>
    )
}
export default History
