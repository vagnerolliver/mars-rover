# Mars Rover Photos

React application to view 4 randomly chosen from one of the existing NASA APIs, more specifically the Mars Rover photos [link api](https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos ) and **caching per url requested using custom useFetch hook**.


## Architecture

- hooks
- useState
- useEffect
 

## Scripts

`$ npm run dev `

`$ npm run test `

`$ npm run build`  
    
    

## Run Frontend (recommended docker)
`$ docker-compose up` 
- http://localhost:3000


## Run Frontend (npm)
`$ npm run dev`
- http://localhost:3000


## Run Tests (npm)
`$ npm run test`


## Build Deploy  
$ docker build -t marsrover .

