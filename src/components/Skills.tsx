import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
            <h1 className='text-4xl font-bold text-center text-black mb-10'>기술 스택</h1>
            <div className='grid sm:grid-cols-2 gap-12'></div>
        </motion.div>
    )
}
export default Skills
