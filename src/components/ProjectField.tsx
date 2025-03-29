interface ProjectFieldProps {
    img?: string
    title: string
    techs?: Array<string>
    link: string
    blackText?: boolean
}

const ProjectField = ({ img, title, techs, link, blackText }: ProjectFieldProps) => (
    <div
        className='relative flex items-centem justify-center h-autow-full rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer shadow-md'
        onClick={() => window.open(link, '_blank')}
    >
        {img && <img src={img} alt='/' className='rounded-xl object-cover w-[400px] h-[225px] blur-[2px]' loading='lazy' />}
        <div className='absolute flex flex-col items-center justify-center w-full h-full'>
            <p className={`text-xl font-bold tracking-wider text-center ${blackText ? 'text-black' : 'text-white'}`}>{title}</p>
            <span className='flex justify-center '>
                {techs && techs.map((tech, index) => <img key={index} src={tech} alt='' className='pb-4 pt-2 h-12 w-12' />)}
            </span>
        </div>
    </div>
)

export default ProjectField
