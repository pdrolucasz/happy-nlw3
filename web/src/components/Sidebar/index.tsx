import React, { useCallback, useState } from 'react';
import { FiArrowLeft, FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { Link, useHistory } from "react-router-dom";

import mapMarkerImg from '../../images/map-marker.svg';

import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

interface SidebarProps {
    dashboard?: boolean
    approve?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ dashboard, approve }) => {
    const [ focus, setFocus ] = useState(approve)
    const { goBack } = useHistory();
    const { signOut } = useAuth()

    const inputFocus = useCallback(() => {
        setFocus(state => !state)
    }, [])

    return (
        <Container
            approve={focus}
            approved={!focus}
        >
            <img src={mapMarkerImg} alt="Happy" />

            {dashboard && (
                <nav>
                    <Link to="/dashboard" className="approve" onClick={inputFocus}>
                        <FiMapPin size={24} color={`${focus ? "#0089A5" : "#FFF"}`} />
                    </Link>

                    <Link to="/to-be-approved" className="approved" onClick={inputFocus}>
                        <FiAlertCircle size={24} color={`${!focus ? "#0089A5" : "#FFF"}`} />
                    </Link>
                </nav>
            )}

            <footer>
                {dashboard ? 
                    <button type="button" onClick={signOut}>
                        <FiPower size={24} color="#FFF" />
                    </button>
                    :
                    <button type="button" onClick={goBack}>
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                }
            </footer>
        </Container>
    )
}

export default Sidebar