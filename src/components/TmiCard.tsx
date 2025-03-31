import { PropsWithChildren } from 'react'

interface TmiCardProps extends PropsWithChildren {
    number: string
    title?: string
    small?: boolean
}

const TmiCard = ({ number, title, small, children }: TmiCardProps) => (
    <div className='flex flex-col h-full pl-4 pr-4 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer p-3'>
        <div className='bg-gray-100 dark:bg-[#202020] rounded-xl overflow-hidden shadow-md shadow-gray-400 dark:shadow-gray-700 h-[350px]'>
            <div className='p-4'>
                <p className='text-xl font-bold text-blue-500 dark:text-blue-400'>{number}</p>
                {title && <p className='text-2xl font-semibold text-gray-800 dark:text-white'>{title}</p>}
                <div className={`${small ? 'text-base' : 'text-xl'} text-gray-600 dark:text-gray-300 mt-2`}>{children}</div>
            </div>
        </div>
    </div>
)

export default TmiCard
