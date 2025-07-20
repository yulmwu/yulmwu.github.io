import { Project } from './components/Project'
import { projectsData } from '../../data/projects'

export const Projects = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-8'>
        {projectsData.map((project, index) => (
            <Project
                key={index}
                logo={project.logo}
                title={project.title}
                description={project.description}
                period={project.period}
                link={project.link}
                github={project.github}
            />
        ))}
    </div>
)
