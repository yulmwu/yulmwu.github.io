import { PropsWithChildren } from 'react'

interface HistoryFieldsProps extends PropsWithChildren {
    date: Date | string
    title: string
    description?: string
}

const HistoryFields = ({ date, title, description, children }: HistoryFieldsProps) => (
    <ol className={`flex clex-col md:flex-row relative`}>
        <li className='mb-5 ml-4'>
            <p className='flex flex-wrap gap-3 flex-row items-center justify-start text-xs md:text-sm'>
                <span className='inline-block px-2 py-1 text-white dark:text-black bg-[#252525] dark:bg-gray-200 rounded-md'>
                    {typeof date === 'string' ? date : date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                </span>
                <span className='text-lg text-black dark:text-gray-200 pt-[2px]'>{title}</span>
                {description && <span className='text-sm font-normal text-stone-400 dark:text-stone-300 pt-[3px]'>{description}</span>}
            </p>
            {children && <div className='md:ml-3 my-2 text-base font-normal'>{children}</div>}
        </li>
    </ol>
)

export default HistoryFields
