import React, { useRef, useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory, useLocation  } from 'react-router-dom'
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

interface ResetPasswordFormData {
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

    const { addToast } = useToast()

    const location = useLocation()
    const history = useHistory()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Confirmação incorreta',
                )
            })

            await schema.validate(data, {
                abortEarly: false
            })

            const { password, password_confirmation } = data
            const token = location.search.replace('?token=',  '')

            await api.post('password/reset', {
                token,
                password,
                password_confirmation
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
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
             })
        }
    }, [addToast, history, location.search])

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
                    <legend>Redefinição de senha</legend>
                    <p>
                        Escolha uma nova senha para você
                        acessar o dashboard do Happy
                    </p>

                    <label htmlFor="password">Nova senha</label>
                    <Input
                        name="password"
                        id="password"
                        type="password"
                    />

                    <label htmlFor="password_confirmation">Repetir senha</label>
                    <Input
                        name="password_confirmation"
                        id="password_confirmation"
                        type="password"
                    />

                    <Button type="submit">
                        Confirmar
                    </Button>
                </Form>
            </Login>
        </Container>
    )
}

export default ResetPassword