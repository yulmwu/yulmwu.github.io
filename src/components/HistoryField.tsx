import { PropsWithChildren } from 'react'

interface HistoryFieldsProps extends PropsWithChildren {
    date: Date | string
    title: string
    description?: string
}

const HistoryFields = ({ date, title, description, children }: HistoryFieldsProps) => {
    return (
        <ol className={`flex clex-col md:flex-row relative border-l border-stone-200`}>
            <li className='mb-5 ml-4'>
                <p className='flex flex-wrap gap-3 flex-row items-center justify-start text-xs md:text-sm'>
                    <span className='inline-block px-2 py-1 font-semibold text-white bg-[#252525] rounded-md'>
                        {typeof date === 'string' ? date : date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                    <span className='text-lg font-semibold text-black pt-[2px]'>{title}</span>
                    {description && <span className='text-sm font-normal text-stone-400 pt-[3px]'>{description}</span>}
                </p>
                {children && <p className='md:ml-3 my-2 text-base font-normal text-stone-500'>{children}</p>}
            </li>
        </ol>
    )
}

export default HistoryFields
