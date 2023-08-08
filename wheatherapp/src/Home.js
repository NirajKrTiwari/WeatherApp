import React from 'react'
import './index.css'
export default function Home() {
  return (
    <div className='container'>
        <div className='weather'>
          <h2>Weather App</h2>
            <div className='search'>
                <input type='text' placeholder='Enter City Name'/>
                <button>
                  <img src="/src/Images/search.png" width="10" height="10"/>
                </button>
                <img src='/src/Images/search.png'></img>
            </div>
            
        </div>
      
    </div>
  )
}