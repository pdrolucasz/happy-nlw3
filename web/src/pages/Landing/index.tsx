import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../../images/logo.svg'
import './styles.css'

const Landing: React.FC = () => {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <div>
                    <img src={logoImg} alt="Happy"/>
                    <div className="location">
                        <strong>Fortaleza</strong>
                        <span>Ceará</span>
                    </div>
                </div>

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>
                        Visite orfanatos e mude o dia
                        de muitas crianças.
                    </p>
                    
                    <Link to="/signin" className="access">
                        Acesso Restrito
                    </Link>

                    <Link to="/app" className="enter-app">
                        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Landing