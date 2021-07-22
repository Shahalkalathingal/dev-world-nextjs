import { useState } from "react"
import { API_URL } from "../config"
import styles from '@/styles/Form.module.css'


function ImageUpload({articleId,ImageUploaded}) {
    const [image, setImage] = useState(null)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('files',image)
        formData.append('ref','articles')
        formData.append('refId',articleId)
        formData.append('field','image')

        const res = await fetch(`${API_URL}/upload`,{
            method:'POST',
            body:formData
        })

        if(res.ok){
            ImageUploaded()
        }
    }
    const handleChange = (e)=>{
       setImage(e.target.files[0]);
    }
    return (
        <div className={styles.form}>
            <h2>Select Image</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    )
}

export default ImageUpload
