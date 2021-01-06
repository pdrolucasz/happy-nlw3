import React, { InputHTMLAttributes, useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
}

const Checkbox: React.FC<InputProps> = ({ name, children, ...rest }) => {
    const inputRef = useRef(null)

    const { fieldName, registerField, defaultValue  } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: (ref: HTMLInputElement) => {
                if(ref.checked) {
                    return ref.value
                }
                return ''
            },
            clearValue: (ref: HTMLInputElement) => {
                ref.checked = false
            },
            setValue: (ref: HTMLInputElement, value: string) => {
                if(value.includes(ref.id)) {
                    ref.checked = true
                }
            }
        })
    }, [defaultValue, fieldName, registerField])

    return (
        <div
            className="container"
        >
            <input
                ref={inputRef}
                id="check"
                type="checkbox"
                {...rest}
            />
            <label htmlFor="check">{children}</label>
        </div>
    )
}

export default Checkbox