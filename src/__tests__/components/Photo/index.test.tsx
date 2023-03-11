
import { fireEvent, render, screen } from '@testing-library/react';
import { Photo } from '@/components/Photo';

const makeSUT = () => render(<Photo id='123456'  cameraFullName='must camera' imgSrc="image" roverName='curiosity' />)

describe('Photo.tsx', () => {
  beforeEach(() => {
    makeSUT()
  })

  test('assert text', () => {
    const camara = screen.getByText(/must camera/i)
    const rover = screen.getByText(/curiosity/i)
    const id = screen.getByText(/123456/i)

    expect(camara).toBeInTheDocument()
    expect(rover).toBeInTheDocument()
    expect(id).toBeInTheDocument()
  })

  test('assert image alt', () => {
    const alt = screen.getByAltText(/camera: must camera, rover: curiosity .../i)

    expect(alt).toBeInTheDocument()
  })

  test('should hidden spinner when imagem is loaded', () => {
    const spinner = screen.getByTestId('loader')
    expect(spinner).toBeInTheDocument()
    
    const image = screen.getByRole('img')
    fireEvent.load(image);

    expect(spinner).not.toBeInTheDocument()
  })
});