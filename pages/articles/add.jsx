import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import Link from "next/link"
import { useRouter } from "next/router"
import {  useState } from "react"
import styles from '@/styles/Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import 'quill/dist/quill.snow.css'


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



function AddEventPage() {

    const [values, setValues] = useState({
        name: '',
        description: '',
        author: '',
    })

    const router = useRouter()

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        let hasEmptyFields
        if (!values.name || !values.description || !values.author) {
            hasEmptyFields = true
        } else {
            hasEmptyFields = false
        }

        if (hasEmptyFields) {
            return toast.error('Please fill all the fields')
        }

        const res = await fetch(`${API_URL}/articles`, {
            method: 'POST',
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

    // InputChangeHandler
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let author = 'Shahal Kalathingal'
        setValues({ ...values, [name]: value, author: author })
    }

    return (
        <Layout title='Add new article'>
            <Link href='/articles'><a>{'<'} Go Back</a></Link>

            <h2>Add Article</h2>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Title</label>
                        <input type="text" id='name' name='name' value={values.name} onChange={handleInputChange} />
                    </div>
                </div>

                <div>
                    <Quill modules={modules} formats={formats} value={values.description} onChange={e=>setValues({...values,description:e})}/>
                </div>


                <input type="submit" value="Add Article" className='btn' />
            </form>
        </Layout>
    )

}

export default AddEventPage
