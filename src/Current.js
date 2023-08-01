import React, { useEffect } from 'react'
import { useState } from 'react';
import {base} from "./ApiKey/apiKey";
import {key} from "./ApiKey/apiKey";
import Clock from "react-live-clock";
import axios from 'axios';
import Forcast from "./Forcast";
import loader from "./images/WeatherIcons.gif";

import ReactAnimatedWeather from "react-animated-weather";



const Initial_state = {

    
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC:undefined,
    temperatureF:undefined,
    city: undefined,
    country:undefined,
    humidity:undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise:undefined,
    sunset: undefined,
    errorMsg: undefined,
    main:"Check"
  };
const Current = () => {


    const [state,setState]=useState(Initial_state);

     async function  getWeather(lat,lon){
            
           const {data}=await axios.get( `${base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`);
           console.log(data,"ye wala data");
          setState(
            {
                 lat: lat,
                 lon: lon,
                 city: data.name,
                 temperatureC: Math.round(data.main.temp),
                 temperatureF: Math.round(data.main.temp * 1.8 + 32),
                 humidity: data.main.humidity,
                 main: data.weather[0].main,
                 country: data.sys.country,
                sunrise:data.sys.sunrise,
                sunset: data.sys.sunset,
                

            }
          )
        // setState(data);

      }

    const  getPosition = (options) => {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };
        //  console.log("ye wala states",state);

      const defaults = {
        color: "red",
        size: 112,
        animate: true,
      };
  
      const dateBuilder = (d) => {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
      
        return `${day}, ${date} ${month} ${year}`;
      };



   useEffect(()=>{
          const data=getPosition();
          data.then((position)=>{
            getWeather(position.coords.latitude, position.coords.longitude);

          })
          .catch((err) => {
            //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
            this.getWeather(28.67, 77.22);
            alert(
              "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
            );
          });
  
          
         
       },[]
    );





  return (
    
        <>
         {
         state.temperatureC?<>
        
        <div className="city">
            <div className="title">
              <h2>{state.city}</h2>
              <h3>{state.country}</h3>
            </div>
            


            <div className="mb-icon">
              {" "}
              <ReactAnimatedWeather
                icon={state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              {/* <p>{state.main.temp}</p> */}
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} className='Clock' />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {Math.round(state.temperatureC)}°<span>C</span>
                </p>
                <span className="slash">/</span>
                {state.temperatureF} &deg;F

              </div>
            </div>
          </div>
          <Forcast  icon={state.icon} weatherP={state.main}/>
        </>:(
           <>
           <img
            src={loader}
            style={{ width: "50%", WebkitUserDrag: "none" }}
            alt="Icon"
          />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
           </>

        )
       }
         
    </>
      
  )
    
 
  
}

export default Current