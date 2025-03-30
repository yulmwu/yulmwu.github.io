import { motion } from 'framer-motion'
import Title from './components/Title'
import { useInView } from 'react-intersection-observer'

interface ContactProps {
    className?: string
}

const Contact = ({ className }: ContactProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div
            id='contact'
            className={`w-full h-screen top-0 left-0 ${className}`}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <div className='m-auto h-full w-full flex flex-col justify-center items-center gap-2'>
                <Title title='연락처' iconSrc='/emojis/mail.svg' />
                <div className='flex flex-col gap-4'>
                    <div className='text-center text-xl mb-5 text-gray-800 dark:text-gray-300'>365일 24시간, 언제든지 환영합니다.</div>
                    <div className='text-center text-lg'>
                        <span className='text-[#205fff] dark:text-[#80a4ff]'>전화번호</span> :{' '}
                        <span className='text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400'>010-2980-1336</span>
                    </div>
                    <div className='text-center text-lg'>
                        <span className='text-[#205fff] dark:text-[#80a4ff]'>이메일</span> :{' '}
                        <a
                            href='mailto:normal8781@gmail.com'
                            className='text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400'
                        >
                            normal8781@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default Contact
