import React, {
    ChangeEvent,
    useRef,
    useEffect,
    useCallback,
    useState,
} from 'react'
import { useField } from '@unform/core'
import { FiPlus } from 'react-icons/fi'

import { Container } from './styles'

interface Props {
    name: string
}
type InputProps = JSX.IntrinsicElements['input'] & Props

const ImageInput: React.FC<InputProps> = ({ name, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const { fieldName, registerField, defaultValue } = useField(name)

    const [preview, setPreview] = useState<string[]>(defaultValue)

    const handlePreview = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }

        const selectedImages = Array.from(event.target.files)

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
        })

        setPreview(selectedImagesPreview)
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'files',
            clearValue(ref: HTMLInputElement) {
                ref.value = ''
                setPreview(_ => [])
            },
            setValue(_: HTMLInputElement, value: string) {
                setPreview(state => [ ...state, value ])
            },
      })
    }, [fieldName, registerField])

    return (
      <Container>
        <div>
            {preview && preview.map(image => {
                return (
                    <img key={image} src={image} alt={name}/>
                )
            })}

            <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
            </label>
        </div>

        <input type="file" multiple ref={inputRef} onChange={handlePreview} id="image[]" {...rest} />
      </Container>
    )
}
export default ImageInput