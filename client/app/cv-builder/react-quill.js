
"use client"
import React, { useState, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './cv-builder.module.css'
import dynamic from 'next/dynamic'


const CVBuilder = () =>{
    const [value, setValue] = useState("")
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    return(
        <div className={styles.container}>
            <div className={styles.inputBox}>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <div className={styles.preview}>
             {value}
            </div>

        </div>
    )
}
export default CVBuilder;