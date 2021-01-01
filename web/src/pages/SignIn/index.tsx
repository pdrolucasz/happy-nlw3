import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logotipo from '../../images/logotipo.svg'

import './styles.css'

const SignIn: React.FC = () => {
    return (
        <div id="page-signin">
            <div className="content">
                <div>
                    <img src={logotipo} alt="Happy logotipo"/>
                    <div className="location">
                        <strong>Fortaleza</strong>
                        <span>Ceará</span>
                    </div>
                </div>
                
            </div>
            <main className="login">
                <Link to="/" className="back-landing">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </Link>
                <form className="signin">
                    <legend>Fazer login</legend>
                </form>
            </main>
        </div>
    )
}

export default SignIn