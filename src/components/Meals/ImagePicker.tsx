'use client'

import { useRef, useState } from 'react'
import classes from './ImagePicker.module.css'
import Image from 'next/image';

interface ImagePickerProps {
    label: string;
    name: string;
}

const ImagePicker = ({ label, name }: ImagePickerProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    
    const imageInput = useRef<HTMLInputElement | null>(null)

    const handlePickClick = () => {
        if (imageInput.current) {
            imageInput.current.click()
        }
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        if (!event.target.files) { return }

        const file = event.target.files[0]

        if (!file) { 
            setSelectedImage(null)
            return 
        }

        const fileReader = new FileReader()

        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                setSelectedImage(fileReader.result)
            }
        }

        fileReader.readAsDataURL(file)
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!selectedImage && <p>No image has been selected</p>}
                    {selectedImage && (<Image src={selectedImage} alt="The image selected by the user" fill/>)}
                </div>
                <input 
                    className={classes.input} 
                    type="file" 
                    id={name} 
                    name={name} 
                    accept="image/*" 
                    ref={imageInput} 
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type='button'onClick={handlePickClick}>Pick an Image</button>
            </div>
        </div>
    )
}

export default ImagePicker