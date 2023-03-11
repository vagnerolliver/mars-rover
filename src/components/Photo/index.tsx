import { useState } from 'react'
import { Loader } from '../Loader'

import './styles.scss'

interface Photo {
  id: string
  imgSrc: string
  cameraName: string
  cameraFullName: string
  roverName: string
} 

export function Photo(props: Photo) {
  const [loading, setLoading] = useState(true)
  const { cameraName, cameraFullName, imgSrc, id, roverName } = props 

  const handleOnLoad = () => {
    setLoading(false)
  }

  const descriptionImage = () => {
    return `camera: ${cameraFullName}, rover: ${roverName} ...`
  }

  return (
    <div className={`card ${loading ? 'is-loading' : ''}`}>      
      <div>
        {loading && <Loader />}
        <img className="img" src={imgSrc} alt={descriptionImage()} aria-labelledby={cameraName} onLoad={handleOnLoad} />
      </div>

      <ul id={cameraName}>
        <li> id: {id} </li>
        <li> camera: {cameraFullName} </li>
        <li> rover: {roverName}</li>
      </ul>
    </div>
  )
} 