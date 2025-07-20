import { Link } from 'react-router-dom'

interface NavBarProps {
    active?: 'home' | 'projects' | 'articles' | 'socials'
}

const navBarItems = [
    { name: 'Home', link: '/', active: 'home' },
    { name: 'Projects', link: '/projects', active: 'projects' },
    { name: 'Articles', link: '/articles', active: 'articles' },
    { name: 'Socials', link: '/socials', active: 'socials' }
]

export const NavBar = ({ active }: NavBarProps) => (
    <div className='flex justify-center items-center m-0'>
        <nav className='fixed top-4 z-50 flex justify-center items-center w-full'>
            <div className='h-10 px-6 bg-white/30 backdrop-blur-lg border border-white/20 shadow-md rounded-full hover:scale-[103%] transition-transform duration-300'>
                <ul className='flex gap-7 items-center h-full list-none text-sm'>
                    {navBarItems.map((item) => (
                        <li key={item.name} className='hover:scale-105 transition-transform duration-300'>
                            <Link
                                to={item.link}
                                className={`font-bold ${
                                    active === item.active
                                        ? 'text-blue-500 hover:text-blue-600'
                                        : 'text-gray-500 hover:text-gray-600'
                                } transition-colors duration-300 hover:scale-110`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </div>
)
