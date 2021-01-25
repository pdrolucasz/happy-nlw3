import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiArrowRight } from "react-icons/fi";

import Sidebar from '../../components/Sidebar'
import api from '../../services/api'
import mapIcon from '../../utils/mapIcon'

import { Container, Content, Article } from './styles'

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

const ToBeApproved: React.FC = () => {
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/approveOrphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [])

    return(
        <Container>
            <Sidebar dashboard={true} />
            <Content>
                <header>
                    <h1>Cadastros pendentes</h1>
                    <span>{orphanages.length === 1 ? '1orfanato' : `${orphanages.length}orfanatos`}</span>
                </header>

                <Article>

                    {orphanages.map(orphanage => (
                            <section>
                                <Map 
                                    center={[orphanage.latitude, orphanage.longitude]} 
                                    style={{ width: '100%', height: 280 }}
                                    zoom={20}
                                    zoomControl={false}
                                    dragging={false}
                                >
                                <TileLayer 
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                    
                                {orphanage.latitude !== 0 && (
                                    <Marker
                                        interactive={false}
                                        icon={mapIcon}
                                        position={[
                                            orphanage.latitude,
                                            orphanage.longitude
                                        ]}
                                    />
                                )}
                    
                                </Map>
                            
                            <div>
                                <h2>{orphanage.name}</h2>

                                <nav>
                                    <Link to={`/edit-orphanage/${orphanage.id}`}><FiArrowRight color="#15C3D6" size={30} /></Link>
                                </nav>
                            </div>
                        </section>
                    ))}
                </Article>
            </Content>
        </Container>
    )
}

export default ToBeApproved