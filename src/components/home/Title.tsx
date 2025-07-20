import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

export const Title = () => {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            {
                root: null,
                threshold: 0.1,
            }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [])

    return (
        <div ref={containerRef}>
            {isVisible ? (
                <TypeAnimation
                    sequence={[
                        '세명컴퓨터고등학교 학생입니다.',
                        1200,
                        '타입스크립트를 좋아하며...',
                        1200,
                        'NestJS를 사용하여 백엔드 공부를, 그리고 AWS 공부를 하고 있습니다.',
                        1500,
                        '열정적이고 책임감있는, 그리고 도움을 주는 것을 좋아하는 INFJ 입니다.',
                        2500,
                    ]}
                    wrapper='span'
                    cursor={true}
                    repeat={Infinity}
                    deletionSpeed={50}
                />
            ) : (
                <span>세명컴퓨터고등학교 학생입니다.</span>
            )}
        </div>
    )
}
