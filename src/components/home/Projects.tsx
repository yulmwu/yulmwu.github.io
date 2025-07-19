import { Project } from './components/Project'

export const Projects = () => (
    <>
        <h2 className='text-3xl font-bold mb-6 text-center' id='projects'>
            Projects
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 pb-8'>
            <div>
                <Project
                    logo='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png'
                    title='테스트'
                    description='테스트 프로젝트 설명입니다.'
                    period='23.10.10 ~ 23.11.24'
                    link='/projects/1'
                />
            </div>
        </div>
    </>
)
