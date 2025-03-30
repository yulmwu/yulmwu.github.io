import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Title from './components/Title'
import Slider, { Settings } from 'react-slick'
import TmiCard from './TmiCard'

interface TmiProps {
    className?: string
}

const Tmi = ({ className }: TmiProps) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
    })

    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024, // lg (min 1024px)
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 640, // md (min 640px)
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480, // sm (min 480px)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    return (
        <motion.div
            id='tmi'
            className={`md:pl-20 md:pr-20 p-4 py-14 ${className}`}
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <div className='flex flex-col items-center justify-center'>
                <Title title='TMI' iconSrc='/emojis/thinking.svg' />

                <Slider {...settings} className='mt-6 w-[80%]'>
                    <TmiCard number='01' title='MBTI'>
                        5년 연속 <span className='text-green-500 dark:text-green-400'>INFJ</span>
                    </TmiCard>
                    <TmiCard number='02' title='사는 곳'>
                        은평구 신사동
                        <br />
                        <span className='text-gray-400 dark:text-gray-500'>본가: 인천 부평구 (자취)</span>
                    </TmiCard>
                    <TmiCard number='03' title='여자친구'>
                        없음..
                    </TmiCard>
                    <TmiCard number='04' title='생일'>
                        4월 22일
                    </TmiCard>
                    <TmiCard number='05' title='취미/관심사' small>
                        악기(일렉기타 등등) + 관련 장비, 회로 설계 + 제작, 프로그래밍 등등
                    </TmiCard>
                    <TmiCard number='06' title='음악 취향' small>
                        블루스, 재즈, 팝, R&B 등등 메탈같은 정신없는 거 빼고 다 좋아함
                    </TmiCard>
                    <TmiCard number='07' title='좋아하는 아티스트' small>
                        Stevie Ray Vaughan, John Mayer, Boyz II Men, Frank Sinatra, 김광석 등등
                    </TmiCard>
                    <TmiCard number='08' title='인생 음악' small>
                        My Way, End of the Road, 플라워 - Endless 등등
                    </TmiCard>
                    <TmiCard number='09' title='좋하하는 음식' small>
                        싫어하는 거 빼고 다 좋아함
                    </TmiCard>
                    <TmiCard number='10' title='싫어하는 음식' small>
                        해산물(절대 안먹음), 달달한 음식, 느끼한 음식, 매운 음식 등등
                    </TmiCard>
                    <TmiCard number='11' title='이상형'>
                        마음만 통하면 됨..
                    </TmiCard>
                    <TmiCard number='12' title='좋아하는 계절'>
                        가을, 겨울
                    </TmiCard>
                    <TmiCard number='12' title='좋아하는 과목'>
                        전공 과목, 음악
                    </TmiCard>
                    <TmiCard number='13' title='좋아하는 게임'>
                        게임 자체를 안함
                    </TmiCard>
                    <TmiCard number='14' title='강아지 vs 고양이'>
                        야옹이
                    </TmiCard>
                    <TmiCard number='15' title='민초 호불호'>
                        그냥 먹음
                    </TmiCard>
                    <TmiCard number='16' title='좋아 하는 것' small>
                        남들에게 도움을 주는 것, 그 밖엔 05번, 취미/관심사 참조
                    </TmiCard>
                    <TmiCard number='17' title='싫어하는 하는 것' small>
                        사람 많은 곳, 시끄러운 곳, 예의없는 것(칼차단)
                    </TmiCard>
                    <TmiCard number='18' title='낮 vs 밤'>
                        낮
                    </TmiCard>
                    <TmiCard number='19' title='공부 방법'>
                        블로그, 노션 등에 정리함
                    </TmiCard>
                    <TmiCard number='20' title='일어나서 먼저 하는 것'>
                        일정 확인
                    </TmiCard>
                    <TmiCard number='21' title='자기 전 하는 것'>
                        내일 일정 확인
                    </TmiCard>
                    <TmiCard number='22' title='나랑 친해지는 방법'>
                        그냥 편하게 말 걸거나 연락하면 됨
                    </TmiCard>
                    <TmiCard number='23' title='가족 관계'>
                        외동
                    </TmiCard>
                    <TmiCard number='24' title='해주고 싶은 말'>
                        고생했다..
                    </TmiCard>
                    <TmiCard number='마지막..' title='이 페이지는' small>
                        <span className='text-blue-700 dark:text-blue-200'>React</span>,{' '}
                        <span className='text-blue-500 dark:text-blue-400'>TypeScript</span>,{' '}
                        <span className='text-orange-500 dark:text-orange-400'>TailwindCSS</span>,
                        <br />
                        Framer Motion, React Slick으로 제작되었으며, <br />
                        <a href='https://github.com/yulmwu/yulmwu.github.io' className='text-blue-500 dark:text-blue-400'>
                            오픈소스
                        </a>
                        입니다.
                        <p className='text-gray-400 dark:text-gray-500 mt-3'>제작: 김준영(@yulmwu)</p>
                    </TmiCard>
                </Slider>
                <div className='flex justify-center text-center mt-10'>
                    <p className='text-gray-600 dark:text-gray-400 text-lg'>
                        <span className='text-blue-500 dark:text-blue-400'>TMI</span> = Too Much Information.
                        <br />
                        궁금한게 있다면 따로 편하게 물어보세요~!
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default Tmi
