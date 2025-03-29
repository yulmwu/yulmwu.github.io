interface ContactProps {
    className?: string
}

const Contact = ({ className }: ContactProps) => {
    return (
        <div id='contact' className={className}>
            <h1 className='py-4 text-4xl font-bold text-center text-black'>연락처</h1>
            <div className='items-center justify-center'>
                <p className='text-center text-lg text-gray-600'>
                    <span className='text-[#001b5e]'>이메일</span> : normal8781@gmail.com
                </p>
            </div>
        </div>
    )
}
export default Contact
