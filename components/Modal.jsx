import styles from '@/styles/Modal.module.css'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {FaTimes} from 'react-icons/fa'

function Modal({show,onClose,children,title}) {

    const handleClose = (e)=>{
        e.preventDefault()
        onClose()
    }
    
    const modalContent = show ? (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <a href="#" onClick={handleClose}>
                        <FaTimes/>
                    </a>
                </div>
                {title && <div>{title}</div>}
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null

    if(process.browser){
        return ReactDOM.createPortal(modalContent, document.querySelector('#modal-root'))
    }else{
        return null
    }
}

export default Modal