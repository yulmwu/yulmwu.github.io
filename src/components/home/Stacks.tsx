import { techStacks } from '../../data/techs'

export const Stacks = () => (
    <div>
        <h1 className='text-3xl font-bold mb-7'>Tech Stacks</h1>
        {Object.entries(techStacks).map(([category, techs]) => (
            <div key={category} className='mt-6'>
                <h3 className='text-md text-gray-400 font-bold mb-3 border-l-3 border-gray-300 pl-4'>
                    {category}
                    <span className='text-gray-500'> ({techs.length})</span>
                </h3>
                <div className='flex gap-2 overflow-x-auto scrollbar-hide p-1'>
                    {techs.map((tech) => (
                        <span
                            key={tech}
                            className='inline-block bg-white outline outline-gray-100 shadow-sm px-3 py-2 rounded-2xl text-sm text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-colors duration-200 cursor-pointer whitespace-nowrap'
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
)
