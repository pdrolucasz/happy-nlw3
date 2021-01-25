import React, { TextareaHTMLAttributes, useRef, useEffect, useState } from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
}

const TextArea: React.FC<TextAreaProps> = ({ name, ...rest }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const [isFilled, setIsFilled] = useState(false)

    function handleInputBlur() {
        setIsFilled(true)
    }

    const { fieldName, defaultValue, registerField } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField])

    return (
        <Container
            isFilled={isFilled}
        >
            <textarea
                id="textarea"
                ref={inputRef} { ...rest }
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                {...rest}
            />
        </Container>
    )
}

export default TextArea