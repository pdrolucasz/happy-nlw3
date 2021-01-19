export default interface IStorageProvider {
    deleteFile(file: string): Promise<void>
}