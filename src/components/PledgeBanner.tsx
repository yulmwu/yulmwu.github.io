import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export const PledgeBanner = () => {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // const dismissed = localStorage.getItem('pledgeBannerDismissed')
        // if (!dismissed) {
            setIsVisible(true)
        // }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        // localStorage.setItem('pledgeBannerDismissed', 'true')
    }

    const handleClick = () => {
        navigate('/pledge')
    }

    if (!isVisible) return null

    return (
        <div className='w-full bg-primary text-white shadow-md rounded-lg mb-12 bg-blue-400'>
            <div className='px-4 py-3 flex items-center justify-between'>
                <div className='flex flex-col gap-1 flex-1 cursor-pointer' onClick={handleClick}>
                    <span className='text-sm sm:text-base font-medium'>
                        2026 세명컴퓨터고등학교 스마트보안솔루션과 과대표
                    </span>
                    <span className='text-sm sm:text-base underline font-semibold'>후보자 공약 보기</span>
                </div>
                <button
                    onClick={handleDismiss}
                    className='ml-4 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer'
                    aria-label='Close banner'
                >
                    <FontAwesomeIcon icon={faXmark} className='text-lg' />
                </button>
            </div>
        </div>
    )
}
