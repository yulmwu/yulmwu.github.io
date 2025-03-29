import { useInView } from 'react-intersection-observer'
import ProjectItems from './ProjectField'
import { motion } from 'framer-motion'

interface ProjectsProps {
    className?: string
}

const Projects = ({ className }: ProjectsProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div
            id='projects'
            className={`md:pl-20 md:pr-20 p-4 py-14 ${className}`}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <h1 className='text-4xl font-bold text-center text-black mb-10'>개인 프로젝트</h1>
            <div className='grid sm:grid-cols-2 gap-12'>
                <ProjectItems
                    link='https://github.com/yulmwu/6502'
                    img='/6502-preview.png'
                    title='6502 에뮬레이터'
                    techs={['/techs/rust.svg', '/techs/html.svg', '/techs/js.svg']}
                />
                <ProjectItems
                    link='https://github.com/yulmwu/swua'
                    img='/swua-preview.png'
                    title='Swua 프로그래밍 언어'
                    techs={['/techs/rust.svg']}
                />
                <ProjectItems
                    link='https://github.com/eocndp/eocndp.github.io'
                    img='/blog-preview.png'
                    title='블로그'
                    techs={['/techs/jekyll-icon.svg', '/techs/github-white.svg']}
                />
                <ProjectItems
                    link='https://github.com/yulmwu/jp-study'
                    img='/jp-preview.png'
                    title='히라가나 공부 게임'
                    techs={['/techs/react-icon.svg', '/techs/ts.svg']}
                    blackText
                />
            </div>
            <div className='flex justify-center text-center mt-10'>
                <button
                    className='bg-[#dadada] text-gray-700 text-xl mt-4 min-w-[80px] p-2 rounded-lg hover:bg-[#c7c7c7] pl-5 pr-5 cursor-pointer'
                    onClick={() => window.open('https://gitub.com/yulmwu', '_blank')}
                >
                    Github에서 더 확인하기
                </button>
            </div>
        </motion.div>
    )
}
export default Projects
