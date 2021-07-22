import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import {FaImage} from 'react-icons/fa'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from '@/styles/Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import 'quill/dist/quill.snow.css'
import Modal from '@/components/Modal'
import ImageUpload from "@/components/ImageUpload"

const Quill = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        [{ script: "sub" }, { script: "super" }]
        [{ align: [] }],
        ['link', 'image', 'video', 'code-block'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}


const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]



function EditArticlePage({ article }) {
    const [values, setValues] = useState({
        name: article.name,
        description: article.description,
        author: article.author,
    })


    const imageUploaded = async(e)=>{
        const res = await fetch(`${API_URL}/articles/${articleId}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    const [imagePreview, setImagePreview] = useState(article.image ? article.image.formats.thumbnail.url : null)

    const [showModal,setShowModal] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values);
        let hasEmptyFields
        if (!values.name || !values.description || !values.author) {
            hasEmptyFields = true
        } else {
            hasEmptyFields = false
        }

        if (hasEmptyFields) {
            return toast.error('Please fill all the fields')
        }

        const res = await fetch(`${API_URL}/articles/${article.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (!res.ok) {
            toast.error('Something went wrong')
        } else {
            const article = await res.json()
            router.push(`/articles/${article.slug}`)
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let author = article.author
        setValues({ ...values, [name]: value, author: author })
    }

    return (
        <Layout title='Add new article'>
            <Link href='/articles'><a>{'<'} Go Back</a></Link>
            <h2>Edit Article</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Title</label>
                        <input type="text" id='name' name='name' value={values.name} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                <div>
                    <Quill modules={modules} formats={formats} value={values.description} onChange={e=>setValues({...values,description:e})}/>
                </div>
                </div>

                <input type="submit" value="Update Article" className='btn' />
            </form>

            <h2>Article Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : <div>
                <p>
                    No image uploaded
                </p>
            </div>}
            <div>
                <button className='btn-secondary' onClick={()=>setShowModal(true)}>
                    <FaImage/> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={()=>setShowModal(false)}>
               <ImageUpload articleId={article.id} imageUploaded={imageUploaded}/>
            </Modal>
        </Layout>
    )
}


export async function getServerSideProps({ params: { id } ,req}) {
    const res = await fetch(`${API_URL}/articles/${id}`)
    const article = await res.json()
    return {
        props: {
            article
        }
    }
}

export default EditArticlePage
