import { FaDiscord, FaGithub } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const Main = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div id='main' ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.3 }}>
            <div className='w-full h-screen top-0 left-0'>
                <div className='m-auto h-full w-full flex flex-col justify-center lg:items-center items-center gap-2'>
                    <p className='text-4xl sm:text-5xl md:text-6xl font-bold text-gray-950 dark:text-white w-full text-center'>Kim Jun Young</p>
                    <p className='flex text-lg text-gray-950'>
                        <span className='text-2xl sm:text-3xl md:text-4xl text-[#212121] dark:text-gray-300 pt-[6px] pr-3'>반갑습니다</span>
                        <img src='/emojis/wave.svg' alt='/' className='wave w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14' />
                    </p>
                    <div className='flex gap-4 pt-4'>
                        <a href='https://github.com/yulmwu' target='_blank'>
                            <FaGithub className='cursor-pointer w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] dark:text-white' />
                        </a>
                        <a href='https://discord.com/users/615383266412724246' target='_blank'>
                            <FaDiscord className='cursor-pointer w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] dark:text-white' />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default Main
