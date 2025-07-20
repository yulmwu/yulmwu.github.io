import { Link } from 'react-router-dom'

interface NavBarProps {
    active: 'home' | 'projects' | 'articles'
}

export const NavBar = ({ active }: NavBarProps) => (
    <div className='flex justify-center items-center m-0'>
        <nav className='fixed top-4 z-50 flex justify-center items-center w-full'>
            <div className='h-10 bg-white shadow-md rounded-full px-6'>
                <ul className='flex gap-7 items-center h-full list-none text-sm'>
                    <li>
                        <Link
                            to='/'
                            className={`font-bold ${
                                active === 'home'
                                    ? 'text-blue-500 hover:text-blue-600'
                                    : 'text-gray-500 hover:text-gray-600'
                            } transition-colors duration-300`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/projects'
                            className={`font-bold ${
                                active === 'projects'
                                    ? 'text-blue-500 hover:text-blue-600'
                                    : 'text-gray-500 hover:text-gray-600'
                            } transition-colors duration-300`}
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/articles'
                            className={`font-bold ${
                                active === 'articles'
                                    ? 'text-blue-500 hover:text-blue-600'
                                    : 'text-gray-500 hover:text-gray-600'
                            } transition-colors duration-300`}
                        >
                            Articles
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
)
