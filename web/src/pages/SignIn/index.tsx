import React, { useRef } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import logotipo from '../../images/logotipo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import './styles.css'

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    function handleSubmit() {

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
                <Form ref={formRef} onSubmit={handleSubmit} className="signin">
                    <legend>Fazer login</legend>

                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <Input
                            name="email"
                            id="email"
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="senha">Senha</label>
                        <Input
                            name="senha"
                            id="senha"
                            type="password"
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

                    <Button type="submit">
                        Confirmar
                    </Button>
                </Form>
            </main>
        </div>
    )
}

export default SignIn