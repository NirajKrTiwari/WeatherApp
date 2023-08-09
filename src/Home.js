import React, { useEffect } from 'react'
import './index.css'
import axios from 'axios'
import { useState } from 'react'
import clear from "../src/Images/clear.png"
import rain from "../src/Images/rain.png"
import cloud from "../src/Images/cloud.png"
import drizzle from "../src/Images/drizzle.png"
import mist from "../src/Images/mist.png"

export default function Home() {
  const [error, seterror] = useState("")
  const [data, setData] = useState(
    {
      celcius: 0,
      name: 'City',
      humidity: '0',
      speed: '0',
      image: clear,
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
          if (res.data.weather[0].main == "Clouds") {
            imagePath = cloud
          }
          else if (res.data.weather[0].main == "Clear") {
            imagePath = clear
          }
          else if (res.data.weather[0].main == "Rain") {
            imagePath = rain
          }
          else if (res.data.weather[0].main == "Drizzle") {
            imagePath = drizzle
          }
          else if (res.data.weather[0].main == "Mist") {
            imagePath = mist
          }
          else {
            imagePath = clear
          }
          setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, weather: res.data.weather[0].main, image: imagePath })
          seterror("")
        }
        )
        .catch(err =>{
          if(err.response.status==404)
          {
            seterror("Invalid City Name")
          }
          console.log(err)
        }
          )
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (name != '') {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4a6e6d4204310e6439bff3deed80795e&units=metric`;
        axios.get(apiUrl)
          .then(res => {
            let imagePath = '';
            if (res.data.weather[0].main == "Clouds") {
              imagePath = cloud
            }
            else if (res.data.weather[0].main == "Clear") {
              imagePath = clear
            }
            else if (res.data.weather[0].main == "Rain") {
              imagePath = rain
            }
            else if (res.data.weather[0].main == "Drizzle") {
              imagePath = drizzle
            }
            else if (res.data.weather[0].main == "Mist") {
              imagePath = mist
            }
            else {
              imagePath = clear
            }
            seterror("")
            setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, weather: res.data.weather[0].main,image:imagePath })
          })
          .catch(err =>{
            if(err.response.status==404)
            {
              seterror("Invalid City Name")
            }
            console.log(err)
          }
            )
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
        <div className='error'>
            {error}
        </div>
        <div className='winfo'>
          <img className="icon" src={data.image} alt="Weather" />
          {/* <h3>{data.weather}</h3> */}
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