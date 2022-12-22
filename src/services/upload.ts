const { cloudinary } = require('../utils/cloudinary')

class UploadService {
    upload = async (file: any): Promise<string> => {
        try {
            const res = await cloudinary.uploader.upload(file.path, {
                upload_preset: 'image_upload'
            })
            return res.url
        } catch (err) {
            return 'Upload error';
        }
    }

    uploadMultiple = async (files: any): Promise<string[] | null> => {
        try {
            const urls = Promise.all(files.map(async file => {
                const res = await cloudinary.uploader.upload(file.path, {
                    upload_preset: 'image_upload',
                })
                return res.url
            }))
            return urls;
        } catch (err) {
            return null
        }
    }

    uploadMultipleVideo = async (files: any): Promise<string[] | null> => {
        try {
            const urls = Promise.all(files.map(async file => {
                const res = await cloudinary.uploader.upload(file.path, {
                    upload_preset: 'video_upload',
                    resource_type: "video",
                })
                return res.url
            }))
            return urls;
        } catch (err) {
            return null
        }
    }
}
export { UploadService }