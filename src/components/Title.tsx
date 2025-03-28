import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const App = () => {
    const { ref: titleRef, inView: titleInView } = useInView({
        triggerOnce: false,
        threshold: 1,
    })

    const { ref: aboutRef, inView: aboutInView } = useInView({
        triggerOnce: false,
        threshold: 1,
    })

    return (
        <div className='overflow-y-scroll h-screen snap-y snap-mandatory'>
            <div
                // ref={ref}
                className='h-full w-full snap-start bg-gray-100 flex justify-center items-center'
            >
                <motion.div
                    ref={titleRef}
                    initial={{ y: -50, opacity: 0 }}
                    animate={titleInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className='text-4xl font-bold text-center w-full'
                >
                    <p className='inline-block text-3xl mb-3 text-center tracking-[0.07em] mr-[-0.07]'>Who am I ?</p>
                    <img className='w-14 h-14 ml-5 bg-transparent inline-block animate-pulse' src='../../public/thinking.svg' alt='thinking' />
                    <p className='text-3xl myungjo mb-3 text-center'></p>
                </motion.div>
            </div>

            <div className='h-full w-full snap-start bg-white flex justify-center items-center'>
                <motion.div
                    ref={aboutRef}
                    initial={{ y: -50, opacity: 0 }}
                    animate={aboutInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className='text-4xl font-bold text-center w-full'>
                        <p className='text-5xl mb-7 text-center tracking-[1em] mr-[-1em]'>김준영</p>
                        <p className='text-3xl mb-5 text-center tracking-[0.05em] mr-[-0.05em]'>
                            <span className='text-gray-600'>K</span>
                            <span className='text-gray-400'>im</span>
                            <span className='text-gray-600'> J</span>
                            <span className='text-gray-400'>un</span>
                            <span className='text-gray-600'> Y</span>
                            <span className='text-gray-400'>oung</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.section
                className='h-screen snap-start bg-gray-100 flex flex-col justify-center items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className='mb-10'>
                    <h2 className='text-3xl font-semibold'>약력</h2>
                    <ul className='mt-4 text-gray-600 list-disc pl-6'>
                        <li>
                            <span className='text-blue-500'>2008. 04. 22.</span> ~
                        </li>
                        <li>
                            <span className='text-blue-500'>2023. 09. 20.</span> 정보처리기능사 취득
                        </li>
                        <li>
                            <span className='text-blue-500'>2024. 01. 05.</span> 영원중학교 졸업
                        </li>
                        <li>
                            <span className='text-blue-500'>2024. 01. 05.</span> 세명컴퓨터고등학교 입학
                        </li>
                    </ul>
                </div>
            </motion.section>

            <motion.section
                className='h-screen snap-start bg-white flex justify-center items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div>
                    <h2 className='text-3xl font-semibold'>기타 사항</h2>
                    <ul className='mt-4 text-gray-600 list-disc pl-6'>
                        <li>
                            <span className='text-red-400'>고등학교 1학년</span> 1학기 회장
                        </li>
                        <li>
                            <span className='text-red-400'>고등학교 1학년</span> 방송부 엔지니어
                        </li>
                        <li>
                            <span className='text-red-400'>고등학교 1학년</span> 교과우수상
                            <span className='text-[1rem]'>(음악, 프로그래밍, 컴퓨터 보안, 정보 처리와 관리)</span>
                        </li>
                        <li>
                            <span className='text-red-400'>고등학교 1학년</span> 학과 코딩 챌린지
                            <span className='text-[1rem] pr-3'>(1, 2학기 은상)</span>
                        </li>
                        <li>
                            <span className='text-red-400'>고등학교 1학년</span> 선행상
                        </li>
                        <li>
                            <span className='text-green-500'>고등학교 2학년</span> 1학기 회장
                        </li>
                        <li>
                            <span className='text-green-500'>고등학교 2학년</span> 전공 동아리 <span className='text-purple-400'>널포유(Null4U)</span>{' '}
                            가입
                        </li>
                    </ul>
                </div>
            </motion.section>

            <motion.section
                className='h-screen snap-start bg-blue-500 flex justify-center items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <button className='px-8 py-3 bg-white text-blue-500 rounded-lg'>Contact Me</button>
            </motion.section>
        </div>
    )
}

export default App
