export interface Photo {
  id: string
  img_src: string
  camera: {
    full_name: string
  }
  rover: {
    name: string
    status: string
  }
}