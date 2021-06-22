import * as uuid from 'uuid'
import * as path from 'path'

class FileService {
    saveFile(file: File | undefined) {
        try {
            const fileName = `${uuid.v4()}.jpg`
            const filePath = path.resolve('files', fileName)
            //file?.mv(filePath)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new FileService()
