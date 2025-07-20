import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface CardContainerContent {
    logo?: string
    logoColor?: string
    title: string
    description?: string
    period: string
}

interface CardContainerProps {
    title: string
    icon: IconDefinition
    contents: CardContainerContent[]
    className?: string
}

export const CardContainer = (props: CardContainerProps) => (
    <div className={`rounded-2xl outline outline-gray-100 bg-white shadow-sm mb-5 ${props.className}`}>
        <div className='p-7 pb-1'>
            <div className='flex items-center'>
                <div className='text-sm text-gray-400'>
                    <FontAwesomeIcon icon={props.icon} />
                </div>
                <div className='text-sm text-gray-600 font-semibold pl-3'>{props.title}</div>
            </div>
            <div className='pt-10 text-sm text-gray-700'>
                <div className='space-y-3 mb-2'>
                    {props.contents.map((content, index) => (
                        <div key={index} className='flex flex-col relative pb-6 cursor-pointer'>
                            <div className='flex items-center'>
                                {content.logo ? (
                                    <img
                                        src={content.logo}
                                        alt={content.title}
                                        className='h-8 w-8 rounded-full outline outline-white shadow-md'
                                    />
                                ) : (
                                    <div
                                        className='h-8 w-8 rounded-full flex-shrink-0'
                                        style={{ backgroundColor: content.logoColor ?? '#EDEDED' }}
                                    />
                                )}
                                <div className='pl-4'>
                                    <p className='block sm:hidden text-xs text-gray-400 mb-1'>{content.period}</p>
                                    <div className='text-sm font-bold text-gray-600'>{content.title}</div>
                                    {content.description && (
                                        <p className='text-xs text-gray-500 mt-1.5 break-keep'>{content.description}</p>
                                    )}
                                </div>
                            </div>
                            <p className='hidden sm:block absolute top-0 right-0 text-xs text-gray-400'>
                                {content.period}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
