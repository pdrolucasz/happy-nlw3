export default interface ICreateOrphanageDTO {
    name: string
    latitude: number
    longitude: number
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    images: Array<{
      path: string
    }>
}