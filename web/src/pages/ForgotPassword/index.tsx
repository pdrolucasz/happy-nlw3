import React, { useRef, useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import logotipo from '../../images/logotipo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Background, Login } from './styles'
import api from '../../services/api'

interface ForgotPasswordFormData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const history = useHistory()

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string()
                        .required('Email obrigatório')
                        .email('Digite um email válido'),
            })

            await schema.validate(data, {
                abortEarly: false
            })

            await api.post('password/forgot', {
                email: data.email,
            })

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
            })

            history.push('/dashboard')
        }catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err)

                formRef.current?.setErrors(errors)
                return
            }

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
            })
        }
    }, [addToast, history])

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
                    <legend>Esqueci minha senha</legend>
                    <p>
                        Sua redefinição de senha será enviada
                        para o e-mail cadastrado.
                    </p>

                    <label htmlFor="email">E-mail</label>
                    <Input
                        name="email"
                        id="email"
                    />

                    <Button type="submit">
                        Confirmar
                    </Button>
                </Form>
            </Login>
        </Container>
    )
}

export default ForgotPassword