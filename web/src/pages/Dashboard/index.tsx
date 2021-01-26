import React, { useState, useEffect, useCallback } from 'react'

import { Link } from 'react-router-dom';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiEdit3, FiTrash } from "react-icons/fi";

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

const Dashboard: React.FC = () => {
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    }, [orphanages])

    const removeOrphanage = useCallback(async (id: number) => {
        await api.delete(`/orphanages/${id}`)
    }, [])

    return(
        <Container>
            <Sidebar approve={true} dashboard={true} />
            <Content>
                <header>
                    <h1>Orfanatos Cadastrados</h1>
                    <span>{orphanages.length === 1 ? '1orfanato' : `${orphanages.length}orfanatos`}</span>
                </header>

                <Article>

                    {orphanages.map(orphanage => (
                            <section key={orphanage.id}>
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
                                    <Link to={`/update-orphanage/${orphanage.id}`}><FiEdit3 color="#15C3D6" size={30} /></Link>
                                    <button
                                        onClick={() => removeOrphanage(orphanage.id)}
                                        type="button"
                                    ><FiTrash color="#15C3D6" size={30} /></button>
                                </nav>
                            </div>
                        </section>
                    ))}
                </Article>
            </Content>
        </Container>
    )
}

export default Dashboard