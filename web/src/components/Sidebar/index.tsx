import React from 'react';
import { FiArrowLeft, FiPower } from 'react-icons/fi';
import { useHistory } from "react-router-dom";

import mapMarkerImg from '../../images/map-marker.svg';

import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

interface SidebarProps {
    dashboard?: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ dashboard }) => {
    const { goBack } = useHistory();
    const { signOut } = useAuth()

    return (
        <Container>
            <img src={mapMarkerImg} alt="Happy" />

            {/*<main>
                <FiMapPin size={24} color="#FFF" />
            </main>*/}

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