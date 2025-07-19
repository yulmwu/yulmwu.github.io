import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faDriversLicense, faSchoolFlag } from '@fortawesome/free-solid-svg-icons'

import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'

import { Stacks } from '../components/home/Stacks'
import { CardContainer } from '../components/home/CardContainer'
import { Projects } from '../components/home/Projects'

import { historiesData } from '../data/histories'
import { certificationsData } from '../data/certifications'

import { TypeAnimation } from 'react-type-animation'

export const Home = () => (
    <>
        <div className='page-content'>
            <NavBar active='home' />

            <div className='content-wrapper'>
                <div className='pt-30'>
                    <div className='flex flex-col lg:flex-row justify-between items-center'>
                        <div className='flex flex-col items-start pl-3 sm:pl-10 lg:pl-0 mr-0 lg:mr-6 w-full mb-10 lg:mb-0'>
                            <h1 className='text-4xl font-bold max-w-[85%] mt-4'>Kim Jun Young</h1>
                            <h2 className='text-2xl font-semibold mt-4 text-gray-600'>안녕하세요, 저는</h2>
                            <p className='mt-4 text-lg text-gray-400'>
                                <TypeAnimation
                                    sequence={[
                                        '세명컴퓨터고등학교 학생입니다.',
                                        1200,
                                        '타입스크립트를 좋아하며...',
                                        1200,
                                        'NestJS를 사용하여 백엔드 공부를, 그리고 AWS 공부를 하고 있습니다.',
                                        1500,
                                        '열정적이고 책임감있는, 그리고 도움을 주는 것을 좋아하는 INFJ 입니다.',
                                        2500,
                                    ]}
                                    wrapper='span'
                                    cursor={true}
                                    repeat={Infinity}
                                    deletionSpeed={50}
                                />
                            </p>
                        </div>

                        <div className='mt-6 lg:mt-0'>
                            <div className='w-[250px] h-[250px] overflow-hidden rounded-[10%] shadow-lg cursor-pointer hover:rotate-1 transition-transform duration-300'>
                                <img
                                    src='https://avatars.githubusercontent.com/u/59119316'
                                    alt='about'
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row justify-between items-center'>
                        <div className='flex items-center gap-6 pt-5 text-3xl text-gray-500'>
                            <a href='https://github.com/yulmwu' target='_blank' rel='noreferrer'>
                                <FontAwesomeIcon icon={faGithub} className='hover:text-primary transition-colors' />
                            </a>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-8 pt-15'>
                        <div className='flex-1'>
                            <Stacks />
                        </div>
                        <div className='flex-1'>
                            <CardContainer title='Histories' icon={faSchoolFlag} contents={historiesData} />
                            <CardContainer
                                title='Certifications'
                                icon={faDriversLicense}
                                contents={certificationsData}
                            />
                        </div>
                    </div>

                    <div className='pt-10'>
                        <Projects />
                    </div>

                    <div className='pt-12'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    </>
)
