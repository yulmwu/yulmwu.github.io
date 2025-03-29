import { FaGithub } from "react-icons/fa"

const FixedMenu = () => (
    <div className='fixed bottom-4 left-4 z-50 flex gap-3'>
        <button
            className='bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
            onClick={() => {
                document.documentElement.classList.toggle('dark')
            }}
        >
            <img src='/emojis/moon.svg' alt='/' className='w-6 h-6' />
        </button>
        <button
            className='bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
            onClick={() => window.open('https://github.com/yulmwu/yulmwu.github.io', '_blank')}
        >
            <FaGithub className='w-6 h-6 dark:text-white' />
        </button>
        <button
            className='bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
        >
            <img src='/emojis/top.svg' alt='/' className='w-6 h-6' />
        </button>
        <button
            className='bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
            onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
            }}
        >
            <img src='/emojis/bottom.svg' alt='/' className='w-6 h-6' />
        </button>
    </div>
)

export default FixedMenu
