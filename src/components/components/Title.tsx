interface TitleProps {
    iconSrc?: string
    title: string
}

const Title = ({ iconSrc, title }: TitleProps) => (
    <div className='flex justify-center mt-12'>
        {iconSrc && <img src={iconSrc} alt='/' className='w-10 h-10 mr-5' />}
        <p className='text-4xl font-bold text-center text-black dark:text-white mb-10'>{title}</p>
    </div>
)

export default Title
