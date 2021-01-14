import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
    const inputRef = useRef(null)

    const [isFilled, setIsFilled] = useState(false)

    function handleInputBlur() {
        setIsFilled(true)
    }

    const {fieldName, defaultValue, error, registerField} = useField(name)

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
            isErrored={!!error}
        >            
            <input
                id="input"
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error &&
                <Error title={error}>
                    <FiAlertCircle color="c53030" size={20} />
                </Error>
            }
        </Container>
    )
}

export default Input