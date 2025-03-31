// import Modal from 'react-modal'
import { ImgHTMLAttributes } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'

const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    // const [imageModalOpen, setImageModalOpen] = useState(false)
    // const [selectedImage, setSelectedImage] = useState<string>('')

    return (
        <img
            {...props}
            onClick={() => {
                // setImageModalOpen(true)
                // setSelectedImage(props.src ?? '')
                window.open(props.src ?? '', '_blank')
            }}
            loading='lazy'
        />
    )
}

export default Image
