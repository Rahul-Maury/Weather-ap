import React, { useState, useEffect } from "react";
import axios from "axios";
// import apiKeys from "./apiKey";
import {base} from "./ApiKey/apiKey";
import {key} from "./ApiKey/apiKey";
import ReactAnimatedWeather from "react-animated-weather";




function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Delhi");

  // const [mau,setMau]=useState(weatherP);
  console.log("First-city",city);
  // console.log("weather",weather);
  function handleClick() {
    
    setCity(query);
  }

//   // console.log(mau);


 
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

    const search=async(city)=>{
      try{
      const {data}=await axios.get(
              `${base}weather?q=${city}&units=metric&APPID=${key}`
            )
           console.log(data,"Problem")
         
            setWeather(data);
            setQuery("");

      }
      catch(e){
        console.log("Err-Problem")
        console.log(error);
          setWeather("");
          setQuery("");
          setError({ message: "Not Found", query: city });
      }
    }


  useEffect(() => {
    console.log("second use Effect");
      search(city);

},[city]);

 console.log("thirsd");
  return (
    <>
    
                
      
  <div className="forecast">
      <div className="forecast-icon">
      <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h3>{props.weatherP}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={handleClick}
              alt="Searching...."
            />
          </div>
        </div>
        <ul>
        {typeof weather.main != "undefined" ? (
      
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              
            </div>
              ) : (
              <li>
              {error.query} {error.message}
              <h5>location Not Found</h5>
            </li>
          )} 
          
        </ul>
      </div>
    </div>
      </>
     
   
  )
}
export default Forcast;

