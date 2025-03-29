interface ProjectItemsProps {
    img?: string
    title: string
    techs?: Array<string>
    link: string
    blackText?: boolean
}

const ProjectItems = ({ img, title, techs, link, blackText }: ProjectItemsProps) => {
    return (
        <div
            className='relative flex items-centem justify-center h-autow-full rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'
            onClick={() => window.open(link, '_blank')}
        >
            {img && <img src={img} alt='/' className='rounded-xl object-cover w-[400px] h-[225px] blur-[2px]' />}
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <h3 className={`text-xl font-bold tracking-wider text-center ${blackText ? 'text-black' : 'text-white'}`}>{title}</h3>
                <span className='flex justify-center '>
                    {techs && techs.map((tech, index) => <img key={index} src={tech} alt='' className='pb-4 pt-2 h-12 w-12' />)}
                </span>
            </div>
        </div>
    )
}

export default ProjectItems
