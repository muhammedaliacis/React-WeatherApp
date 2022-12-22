import React from 'react'
import {useVars} from '../ThemeContext'
import './Content.css'
import {image} from './images'
function Content() {
    const {weather} = useVars();
    console.log(weather)
  return (
    <div className='content'>
      <ul className='content-ul'>
     {
        weather && weather?.length ?
        weather?.map((weat, index) => index < 8 &&  <li className='content-li' key={index}>
            <div className='card'>
                <div className='day'>{weat.datetime}</div>
                <div className='img'>
                 <img src={image.a01n} className="imgg" alt={weat.weather.description}/>
                 </div>
                 <p className='aciklama'>{weat.weather.description}</p>

                <div className='temps'>
                    <p className='min'>{Math.floor(weat.max_temp)}°C</p>
                    <p className='max'>{Math.floor(weat.min_temp)}°C</p>
                </div>
            </div>
        </li>) : <h1 className='space'>Please Enter City</h1>
        }
      </ul>
    </div>
  )
}

export default React.memo(Content)
