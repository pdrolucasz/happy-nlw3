import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logotipo from '../../images/logotipo.svg'

import './styles.css'

const SignIn: React.FC = () => {
    const [isFilled, setIsFilled] = useState(false)

    function handleInputBlur() {
        setIsFilled(true)
    }

    return (
        <div id="page-signin">
            <div className="background">
                
                <img src={logotipo} alt="Happy logotipo"/>
                <div className="location">
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </div>
                
            </div>

            <main className="login">
                <Link to="/" className="back-landing">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </Link>
                <form className="signin">
                    <legend>Fazer login</legend>

                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            onBlur={handleInputBlur}
                            className={isFilled ? 'green' : ''}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            type="password"
                            onBlur={handleInputBlur}
                            className={isFilled ? 'green' : ''}
                        />
                    </div>

                    <div className="options-login">
                        <div className="input-checkbox">
                            <input
                                id="lembrar"
                                type="checkbox"
                            />
                            <label htmlFor="lembrar">Lembrar-me</label>
                        </div>

                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </div>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default SignIn