import React, { useEffect } from 'react'
import './index.css'
import axios from 'axios'
import { useState } from 'react'
export default function Home() {
  const [data, setData] = useState(
    {
      celcius: 0,
      name: 'City',
      humidity: '0',
      speed: '0',
      image: '',
      weather: '--'
    }
  )
  useEffect(() => {

  }, [])
  const [name, setName] = useState('')
  const handleClick = () => {
    if (name != '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4a6e6d4204310e6439bff3deed80795e&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagePath = '';
          console.log(res.data)
          setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, weather: res.data.weather[0].main })
        })
        .catch(err => console.log(err))
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (name != '') {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4a6e6d4204310e6439bff3deed80795e&units=metric`;
        axios.get(apiUrl)
          .then(res => {
            let imagePath = '';
            console.log(res.data)
            setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, weather: res.data.weather[0].main })
          })
          .catch(err => console.log(err))
        e.preventDefault();
        e.target.blur();
      }
    }
  }
  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter City Name' onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} />
          <button onClick={handleClick}>
            <img src={require("../src/Images/search.png")} />
          </button>
        </div>
        <div className='winfo'>
          <img className="icon" src={require("../src/Images/cloud.png")} alt="" />
          <h3>{data.weather}</h3>
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
        </div>
        <div className='details'>
          <div className='col'>
            <img src={require("../src/Images/humidity.png")} alt="" />
            <div className='humidity'>
              <p>{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className='col'>
            <img src={require("../src/Images/wind.png")} alt="" />
            <div className='wind'>
              <p>{Math.round(data.speed)} Km</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}