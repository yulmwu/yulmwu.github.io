interface SkillsFieldProps {
    imageName: string
    alt: string
    name: string
    learning?: boolean
}

const SkillsField = ({ imageName, alt, name, learning }: SkillsFieldProps) => (
    <div className='flex flex-col items-center hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
        <img src={`/techs/${imageName}.svg`} alt={alt} className='h-12 w-12 mb-2 p-2 rounded-md shadow-md' loading='lazy' />
        <div className='flex items-center gap-2'>
            <span className='text-lg text-black dark:text-white'>{name}</span>
            {learning && <img src='/emojis/book.svg' alt='Learning' className='w-5 h-5' title='Learning' />}
        </div>
    </div>
)

export default SkillsField
