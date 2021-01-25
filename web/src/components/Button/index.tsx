import React, { ButtonHTMLAttributes  } from 'react'
import { ButtonConfirm } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    refuse?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <ButtonConfirm type="button" className="confirm-button" {...rest}>
            {children}
        </ButtonConfirm>
    )
}

export default Button