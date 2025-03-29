import { FaDiscord, FaGithub } from 'react-icons/fa'
import WaveImage from '/wave.svg'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const Main = () => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div id='main' ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.3 }}>
            <div className='w-full h-screen top-0 left-0 bg-white/30'>
                <div className='m-auto h-full w-full flex flex-col justify-center lg:items-center items-center gap-2'>
                    <h1 className='text-4xl font-bold text-gray-950 w-full text-center'>Kim Jun Young</h1>
                    <h2 className='flex text-lg text-gray-950'>
                        <span className='text-2xl text-[#212121] pt-[6px] pr-3'>반갑습니다</span>
                        <img src={WaveImage} alt='/' className='w-10 h-10 wave' />
                    </h2>
                    <div className='flex gap-4 pt-4'>
                        <a href='https://github.com/yulmwu' target='_blank'>
                            <FaGithub className='cursor-pointer' size={30} />
                        </a>
                        <a href='https://discord.com/users/615383266412724246' target='_blank'>
                            <FaDiscord className='cursor-pointer' size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
export default Main
