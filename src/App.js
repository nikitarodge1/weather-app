import { useState } from 'react'
import './App.css'

function WeatherApp() {
    const [search,setSearch] = useState('');
    const [weatherData,setWeatherData] = useState({})
    const [loading,setLoading] = useState(false);

    function fetchData(){
        console.log("fetching Data")
        setLoading(true)
        fetch(`https://api.weatherapi.com/v1/current.json?KEY=ce5cd2da50314ca7ac1155357240403&q=${search}`)
        .then(res => res.json())
        .then(data => {
            
            if(data.error)
            {
                setWeatherData(false)
                throw new Error("Failed to Fetch weather Data")
            }else {
                setWeatherData(data)
            }
            
        })
        .then(() => setLoading(false))
        .catch(() => {
            setLoading(false)
            alert("Failed to fetch weather data")
        })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData()
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder='Enter City Name' onChange={handleChange} value={search}/>
                <button type='submit'>Search</button>
            </div>
        </form>

        {loading && <p className="loading">
            Loading data...
        </p>}

        {weatherData && !loading && <div className="weather-cards">
            <div className="weather-card">
                <h2>Temperature</h2>
                <span>{weatherData?.current?.temp_c} C</span>
            </div>
            <div className="weather-card">
                <h2>Humidity</h2>
                <span>{weatherData?.current?.humidity} C</span>
            </div>
            <div className="weather-card">
                <h2>Condition</h2>
                <span>{weatherData?.current?.condition?.text} C</span>
            </div>
            <div className="weather-card">
                <h2>Wind Speed</h2>
                <span>{weatherData?.current?.wind_kph} kph</span>
            </div>
        </div>}
    </>
  )
}

export default WeatherApp;
