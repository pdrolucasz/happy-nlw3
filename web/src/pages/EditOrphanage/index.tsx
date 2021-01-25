import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { useParams } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'


import Sidebar from '../../components/Sidebar'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
//import ImageInput from '../../components/ImageInput'

import { Container, Content } from './styles'

import mapIcon from '../../utils/mapIcon'
import api from '../../services/api'

interface Orphanage {
    id: number
    name: string
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    latitude: number
    longitude: number
    images: Array<{
        id: number
        url: string
    }>
}

interface OrphanageParams {
    id: string
  }

const EditOrphanage: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const params = useParams<OrphanageParams>()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0})
    const [orphanage, setOrphanage] = useState<Orphanage>()

    const [images, setImages] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])
    const [open_on_weekends, setOpenOnWeekends] = useState(orphanage?.open_on_weekends)

    useEffect(() => {
        api.get(`/approveOrphanages/${params.id}`).then(response => {
            setOrphanage(response.data)
        })
    }, [params.id])

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
          return
        }
    
        const selectedImages = Array.from(event.target.files)
    
        setImages(selectedImages)
    
        const selectedImagesPreview = selectedImages.map(image => {
          return URL.createObjectURL(image)
        })
        console.log(selectedImagesPreview)
        setPreviewImages(selectedImagesPreview)
    }

    const handleSubmit = useCallback(async () => {}, [])

    const handleMapClick = useCallback((event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng

        setPosition({
          latitude: lat,
          longitude: lng
        })
    }, [])
    return(
        <Container>
            <Sidebar />

            <Content>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map 
                        center={[-3.7939864,-38.4744778]} 
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
                                defaultValue={orphanage?.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <Textarea
                                name="about"
                                id="about"
                                maxLength={300}
                                defaultValue={orphanage?.about}
                            />
                        </div>

                        <div>
                            <label htmlFor="images">Fotos</label>

                            <div className="addImages">
                                {orphanage?.images.map(image => (
                                    <img key={image.id} src={image.url} alt={orphanage?.name}/>
                                ))}
                                {previewImages.map(image => {
                                    return (
                                        <img key={image} src={image} alt={orphanage?.name}/>
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
                                defaultValue={orphanage?.instructions}
                            />
                        </div>

                        <div>
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <Input
                                name="opening_hours"
                                id="opening_hours"
                                defaultValue={orphanage?.opening_hours}
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
                </Form>
            </Content>
        </Container>
    )
}

export default EditOrphanage