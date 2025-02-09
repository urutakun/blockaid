import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

const WeatherMap = () => {
    const weatherMapAPI = "xDvaWHuKvzSUO9wfW3siHA7VuL8IYV1w";

  return (
    <div className='w-full h-full'>
        <MapContainer center={[8.1836, 126.3567]} zoom={15} className='w-full h-full'>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" zIndex={1}/>
            <TileLayer
          url={`https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/precipitationIntensity/now.png?apikey=${weatherMapAPI}`}
          zIndex={2}
        />
    </MapContainer>
    </div>
  )
}

export default WeatherMap
