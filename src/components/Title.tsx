import { FaDiscord, FaGithub } from 'react-icons/fa'
import WaveImage from '/wave.svg'

const Main = () => {
    return (
        <div id='main'>
            <div className='w-full h-screen top-0 left-0 bg-white/30'>
                <div className='m-auto h-full w-full flex flex-col justify-center lg:items-center items-center gap-2'>
                    <h1 className='text-4xl font-bold text-gray-950 w-full text-center'>Kim Jun Young</h1>
                    <h2 className='flex text-lg text-gray-950'>
                        <span className='text-2xl text-[#001b5e] pt-[6px] pr-3'>반갑습니다</span>
                        <img src={WaveImage} alt='/' className='w-10 h-10 wave' />
                    </h2>
                    <div className='flex gap-4 pt-4'>
                        <a href='https://github.com/yulmwu' target='_blank'>
                            <FaGithub className='cursor-pointer' size={30} />
                        </a>
                        <a href='https://discord.com/users/615383266412724246' target='_blank'>
                            <FaDiscord className='cursor-pointer' size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main
