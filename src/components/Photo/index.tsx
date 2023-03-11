import { useState } from 'react'
import { Loader } from '../Loader'

import './styles.scss'

interface Photo {
  id: string
  imgSrc: string
  cameraFullName: string
  roverName: string
} 

export function Photo(props: Photo) {
  const [loading, setLoading] = useState(true)
  const { cameraFullName, imgSrc, id, roverName } = props 

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
        <a href={imgSrc} target="_blank" title={descriptionImage()}> <img className="img" src={imgSrc} alt={descriptionImage()} aria-labelledby={id} onLoad={handleOnLoad} /></a>
      </div>

      <ul id={id}>
        <li> id: {id} </li>
        <li> camera: {cameraFullName} </li>
        <li> rover: {roverName}</li>
      </ul>
    </div>
  )
} 