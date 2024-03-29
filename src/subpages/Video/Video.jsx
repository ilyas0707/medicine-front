import React, { useState } from 'react'
import Webcam from 'react-webcam'
import Styles from './Video.module.css'

export const Video = ({ data }) => {
    const [image, setImage] = useState('')
    const webcamRef = React.useRef(null)

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        setImage(imageSrc)
    }, [webcamRef])


    return (
        <div className={Styles.video}>
            <h2 className={Styles.heading}>{data.fullname}</h2>
            <div className={Styles.picture}>
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
            </div>
            <button className={Styles.button} onClick={capture}>
                <i className={`material-icons ${Styles.icon}`}>camera_alt</i>
            </button>
            {
                image.length > 0 ?
                <a href={image} className={Styles.download} download="screenshot.jpg">
                    <i className={`material-icons ${Styles.icon}`}>get_app</i>
                </a> : ''
            }
        </div>
    )
}
