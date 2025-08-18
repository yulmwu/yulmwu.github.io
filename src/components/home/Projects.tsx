import { Project } from './components/Project'
import { projects } from '../../data/projects'
import { Link } from 'react-router-dom'

interface ProjectsProps {
    maxProjects?: number
}

export const Projects = ({ maxProjects }: ProjectsProps) => (
    <>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-8'>
            {projects.slice(0, maxProjects).map((project, index) => (
                <Project
                    key={index}
                    logo={project.logo}
                    title={project.title}
                    description={project.description}
                    period={project.period}
                    link={project.link}
                    github={project.github}
                    tags={project.tags}
                    detailTags={project.detailTags}
                />
            ))}
        </div>
        <div className='text-center text-lg'>
            {maxProjects && projects.length > maxProjects ? (
                <Link to='/projects' className='text-gray-500 hover:text-gray-600 transition-colors duration-300'>
                    프로젝트 더보기 (+{projects.length - maxProjects})
                </Link>
            ) : (
                <a
                    href='https://github.com/yulmwu'
                    className='text-gray-500 hover:text-gray-600 transition-colors duration-300'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Github에서 더 많은 프로젝트 확인하기
                </a>
            )}
        </div>
    </>
)
