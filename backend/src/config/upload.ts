import multer from 'multer'
import path from 'path'

export default {
    uploadsFolder: path.resolve(__dirname, '..', '..', 'uploads'),

    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`

            cb(null, filename)
        }
    })
}