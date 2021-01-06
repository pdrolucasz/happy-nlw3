import React, { useRef, useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { useAuth } from '../../hooks/auth'

import logotipo from '../../images/logotipo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import CheckBox from '../../components/CheckBox'

import './styles.css'

interface SignInFormData {
    email: string
    password: string
    lembrar: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            await signIn({
                email: data.email,
                password: data.password,
                remember: !!data.lembrar
            })

            history.push('/dashboard')
        }catch(err) {
            console.log(err)
        }
    }, [history, signIn])

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
                            name="password"
                            id="senha"
                            type="password"
                        />
                    </div>

                    <div className="options-login">
                        <CheckBox name="lembrar">Lembrar-me</CheckBox>

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