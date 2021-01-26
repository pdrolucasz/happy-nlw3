import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useParams, useHistory } from 'react-router-dom'
import { FiPlus, FiXCircle, FiCheck } from 'react-icons/fi'

import Sidebar from '../../components/Sidebar'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Button from '../../components/Button'

import { Container, Content } from './styles'

import mapIcon from '../../utils/mapIcon'
import api from '../../services/api'

interface Orphanage {
    id: number
    name: string
    about: string
    instructions: string
    opening_hours: string
    images: Array<{
        id: number
        url: string
    }>
}

interface OrphanageData {
    name: string
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
}

interface OrphanageParams {
    id: string
    edit: 'approve' | 'update'
}

const EditOrphanage: React.FC = () => {
    const history = useHistory()
    const formRef = useRef<FormHandles>(null)
    const params = useParams<OrphanageParams>()

    const [orphanage, setOrphanage] = useState<Orphanage>()
    const [position, setPosition] = useState({ latitude: 0, longitude: 0})

    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [open_on_weekends, setOpenOnWeekends] = useState(false)

    useEffect(() => {
        api.get(`/${params.edit === 'approve' ? 'approveOrphanages' : 'orphanages'}/${params.id}`).then(response => {
            setOrphanage(response.data)
            setPosition({
                latitude: response.data.latitude,
                longitude: response.data.longitude
            })
            setOpenOnWeekends(response.data.open_on_weekends)
        })
    }, [params.edit, params.id])

    const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
          }
      
          const selectedImages = Array.from(event.target.files)
      
          setImages(selectedImages)
      
          const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image)
          })
          setPreviewImages(selectedImagesPreview)
    }, [])

    const handleSubmit = useCallback(async (orphanageData: OrphanageData) => {
        const { latitude, longitude } = position

        const data = new FormData()

        data.append('name', orphanageData.name)
        data.append('about', orphanageData.about)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))
        data.append('instructions', orphanageData.instructions)
        data.append('opening_hours', orphanageData.opening_hours)
        data.append('open_on_weekends', String(open_on_weekends))
        
        images.forEach(image => {
            data.append('images', image)
        })

        params.edit === 'approve' ?
        await api.put(`/approveOrphanages/${params.id}`, data)
        :
        await api.put(`/updateOrphanage/${params.id}`, data)
        history.push('/dashboard')
    }, [history, images, open_on_weekends, params.edit, params.id, position])

    const refuseOrphanage = useCallback(async () => {
        await api.delete(`/orphanages/${params.id}`)

        history.push('/dashboard')
    }, [history, params.id])

    const handleMapClick = useCallback((event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng

        setPosition({
          latitude: lat,
          longitude: lng
        })
    }, [])

    if (!orphanage) {
        return <p>Carregando...</p>
    }

    return(
        <Container>
            <Sidebar />

            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                            center={[position.latitude, position.longitude]} 
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                        >
                        <TileLayer 
                            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                        />

                        {position.latitude !== 0 && (
                            <Marker
                            interactive={false}
                            icon={mapIcon}
                            position={[
                                position.latitude,
                                position.longitude
                            ]}
                            />
                        )}

                        </Map>

                        <div>
                            <label htmlFor="name">Nome</label>
                            <Input
                                name="name"
                                id="name"
                                defaultValue={orphanage.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <Textarea
                                name="about"
                                id="about"
                                maxLength={300}
                                defaultValue={orphanage.about}
                            />
                        </div>

                        <div>
                            <label htmlFor="images">Fotos</label>

                            <div className="addImages">
                                {orphanage.images.map(image => (
                                    <img key={image.id} src={image.url} alt={orphanage.name}/>
                                ))}
                                {previewImages.map(image => {
                                    return (
                                        <img key={image} src={image} alt={orphanage.name}/>
                                    )
                                })}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>
                            <input multiple onChange={handleSelectImages} type="file" id="image[]" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Visitação</legend>

                        <div>
                            <label htmlFor="instructions">Instruções</label>
                            <Textarea
                                name="instructions"
                                id="instructions"
                                maxLength={300}
                                defaultValue={orphanage.instructions}
                            />
                        </div>

                        <div>
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <Input
                                name="opening_hours"
                                id="opening_hours"
                                defaultValue={orphanage.opening_hours}
                            />
                        </div>

                        <div>
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>

                                <button
                                    type="button"
                                    className={!open_on_weekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    {params.edit === 'approve' ? (
                        <footer>
                            <Button onClick={refuseOrphanage} refuse><FiXCircle size={24} style={{marginRight: 18}} />Recusar</Button>
                            <Button type="submit"><FiCheck size={24} style={{marginRight: 18}} />Aceitar</Button>
                        </footer>
                    ):
                        <Button type="submit">Confirmar</Button>
                    }
                </Form>
            </Content>
        </Container>
    )
}

export default EditOrphanage