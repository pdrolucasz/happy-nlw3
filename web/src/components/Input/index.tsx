import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label: string
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
    const inputRef = useRef(null)

    const [isFilled, setIsFilled] = useState(false)

    function handleInputBlur() {
        setIsFilled(true)
    }

    const {fieldName, defaultValue, registerField} = useField(name)

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
            <label htmlFor="input">{label}</label>
            <input
                id="input"
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </Container>
    )
}

export default Input