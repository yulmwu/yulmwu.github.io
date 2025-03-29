import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SkillsField from './SkillsField'
import Title from './components/Title'

interface SkillsProps {
    className?: string
}

const Skills = ({ className }: SkillsProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    return (
        <motion.div
            id='skills'
            className={`md:pl-20 md:pr-20 p-4 py-14 ${className}`}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <Title title='기술 스택' iconSrc='/emojis/tech.svg' />
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-12 pl-10 pr-10'>
                <SkillsField imageName='js' alt='JavaScript' name='JavaScript' />
                <SkillsField imageName='ts' alt='TypeScript' name='TypeScript' />
                <SkillsField imageName='c' alt='C Language' name='C' />
                <SkillsField imageName='cpp' alt='C++ Language' name='C++' />
                <SkillsField imageName='rust' alt='Rust Language' name='Rust' learning />
                <SkillsField imageName='python' alt='Python' name='Python' />
                <SkillsField imageName='java' alt='Java' name='Java' learning />
                <SkillsField imageName='node' alt='Node.js' name='Node.js' />
                <SkillsField imageName='react' alt='React' name='React' learning />
            </div>
            <p className='text-center text-gray-500 mt-10'>
                <img src='/emojis/book.svg' alt='/' className='w-5 h-5 inline-block mr-2' />
                <span className='text-[20px]'>= 학습 중</span>
            </p>
        </motion.div>
    )
}
export default Skills
