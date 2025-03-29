import { useInView } from 'react-intersection-observer'
import ProjectField from './ProjectField'
import { motion } from 'framer-motion'
import Title from './components/Title'

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
            <Title title='프로젝트' iconSrc='/emojis/project.svg' />
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-12'>
                <ProjectField
                    link='https://github.com/yulmwu/6502'
                    img='/projects/6502-preview.png'
                    title='6502 에뮬레이터'
                    techs={['/techs/rust.svg', '/techs/html.svg', '/techs/js.svg']}
                />
                <ProjectField
                    link='https://github.com/yulmwu/swua'
                    img='/projects/swua-preview.png'
                    title='Swua 프로그래밍 언어'
                    techs={['/techs/rust.svg']}
                />
                <ProjectField
                    link='https://github.com/eocndp/eocndp.github.io'
                    img='/projects/blog-preview.png'
                    title='블로그'
                    techs={['/techs/jekyll-icon.svg', '/techs/github-white.svg']}
                />
                <ProjectField
                    link='https://github.com/yulmwu/jp-study'
                    img='/projects/jp-preview.png'
                    title='히라가나 게임'
                    techs={['/techs/react-icon.svg', '/techs/ts.svg']}
                    blackText
                />
            </div>
            <div className='flex justify-center text-center mt-10'>
                <button
                    className='bg-[#dadada] text-gray-700 text-xl mt-4 min-w-[80px] p-2 rounded-lg hover:bg-[#c7c7c7] pl-5 pr-5 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out'
                    onClick={() => window.open('https://gitub.com/yulmwu', '_blank')}
                >
                    Github에서 더 확인하기
                </button>
            </div>
        </motion.div>
    )
}
export default Projects
