import React, { useRef, useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import logotipo from '../../images/logotipo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'
import CheckBox from '../../components/CheckBox'

import { Container, Background, Login } from './styles'

interface SignInFormData {
    email: string
    password: string
    lembrar: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()

    const { addToast } = useToast()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string()
                        .required('Email obrigatório')
                        .email('Digite um email válido'),
                password: Yup.string()
                        .required('Senha obrigatória')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            await signIn({
                email: data.email,
                password: data.password,
                remember: !!data.lembrar
            })

            history.push('/dashboard')
        }catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)

                formRef.current?.setErrors(errors)
                return
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            })
        }
    }, [addToast, history, signIn])

    return (
        <Container>
            <Background>
                
                <img src={logotipo} alt="Happy logotipo"/>
                <div className="location">
                    <strong>Fortaleza</strong>
                    <span>Ceará</span>
                </div>
                
            </Background>

            <Login>
                <Link to="/" className="back-landing">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </Link>
                <Form ref={formRef} onSubmit={handleSubmit} className="signin">
                    <legend>Fazer login</legend>

                    <label htmlFor="email">E-mail</label>
                    <Input
                        name="email"
                        id="email"
                    />

                    <label htmlFor="senha">Senha</label>
                    <Input
                        name="password"
                        id="senha"
                        type="password"
                    />

                    <div className="options-login">
                        <CheckBox name="lembrar">Lembrar-me</CheckBox>

                        <Link  to="/forgot-password">Esqueci minha senha</Link>
                    </div>

                    <Button type="submit">
                        Confirmar
                    </Button>
                </Form>
            </Login>
        </Container>
    )
}

export default SignIn