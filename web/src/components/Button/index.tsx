import React, { ButtonHTMLAttributes  } from 'react'

import './styles.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <button type="button" className="confirm-button" {...rest}>
            {children}
        </button>
    )
}

export default Button