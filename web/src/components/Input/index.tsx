import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
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
        <div
            className="container"
        >
            <input
                className={isFilled ? 'green' : ''}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />
        </div>
    )
}

export default Input