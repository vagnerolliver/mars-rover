import { useEffect, useState } from 'react'

import { Photo as PhotoTypes } from './types/Photo'
import { Loader } from './components/Loader'
import { Photo } from './components/Photo'
import useFetch from './hooks/useFetch'

const endpoint = import.meta.env.VITE_ENDPOINT_PHOTOS ?? '${VITE_ENDPOINT_PHOTOS}'
const api_key = import.meta.env.VITE_API_KEY ?? '${VITE_API_KEY}'
 
import './App.scss'
import { useItemsRandomly } from './hooks/useItemsRandomly'

interface Resource {
  photos: PhotoTypes[]
}

function App() {
  const [photos, setPhotos] = useState<PhotoTypes[]>([])
  const [url, setUrl] = useState<string>(null!)
  const [page, setPage] = useState(1)
  // The fetch is executed when the component is mounted and if the url changes. 
  const { data, error } = useFetch<Resource>(url)
  const getPhotosRandomly = useItemsRandomly<PhotoTypes>()

  const fethPhotos = (page: number) => {
    const URL = `${endpoint}?sol=1000&page=${page}&api_key=${api_key}`
    setUrl(URL)
    setPage(page)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  useEffect(()=> {
    if(page) {
      fethPhotos(page)
    }
  }, [page])

  useEffect(()=> {
    if (data) {
      const photos = getPhotosRandomly(data.photos)
      setPhotos(photos)
    }
  }, [data])

  if (error) return <p>There is an error.</p>
 
  return (
    <div className="App">
      <h1>Mars Rover Photos Randomly</h1> 
     
      {page > 1 ? <button onClick={() => handlePage(page - 1)}>Prev Page</button> : null}
      
      <button onClick={() => handlePage(page + 1)}>Next Page</button> 
      
      {!data ? <Loader /> : (
        <div className="mars-photos">
          {photos.length ? photos.map((item, index) =>(
            <Photo 
              cameraFullName={item.camera.full_name} 
              roverName={item.rover.name} 
              imgSrc={item.img_src}
              id={item.id}
              key={`item.id-${index}`} 
            />
          )) : 'no results found'}
        </div>
      )}
    </div>
  )
}

export default App
