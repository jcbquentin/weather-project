import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Maps from './Maps';

import './meteowidget.scss';


const MeteoWidget = () => {
  const [city, setCity] = useState('Paris');
  const [temperature, setTemperature] = useState('0');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [icon, setIcon] = useState();
  const [iconDesc, setIconDesc] = useState('');
  const [country, setCountry] = useState('FR');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);


  const moment = require('moment');
  const date = moment().locale('fr').calendar();

  const getValue = (evt) => {
    evt.preventDefault();
    let input = document.getElementById('input').value;
    setCity(input);
  };


  useEffect(
    () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${process.env.REACT_APP_KEY}
        `)
        .then(
          (response) => {
            setTemperature(Math.round(response.data.main.temp));
            setCity(response.data.name);
            setIcon(response.data.weather[0].icon);
            setIconDesc(response.data.weather[0].description)
            setCountry(response.data.sys.country)
            setWind(Math.round(response.data.wind.speed))
            setHumidity(response.data.main.humidity)
            setLat(response.data.coord.lat)
            setLng(response.data.coord.lon)
          }
        );
    },
  )

  return (
    <div className="meteowidget">

      <div className="meteowidget_box">
        <form action="post">
          <input
            className="meteowidget_box-input"
            id="input"
            type="text"
            placeholder="Nom de la ville"
            required
          />
            <button className="meteowidget_box-input_button" type="submit" onClick={getValue}><i className="fas fa-search"></i></button>
        </form>
      </div>

    
      <div className="container-test">
        <div className="meteowidget_box">
            <p className="meteowidget_city"><i className="fas fa-location-arrow" /> {city}, {country}</p>
            <p className="meteowidget_date">{date}</p>
        <div className="meteowidget_container">
          <div className="meteowidget_container-weather">
            <img className="meteowidget_icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconDesc} />
            <p className="meteowidget_icon-desc">{iconDesc}</p>
          </div>
            
          <div className="meteowidget_container-data">
            <p className="meteowidget_temp"><i className="fas fa-thermometer-half" /> {temperature}°C</p>
            <p className="meteowidget_icon-wind"><i className="fas fa-wind" /> Vitesse du vent: {wind} km/h</p>
            <p className="meteowidget_icon-humidity"><i className="fas fa-tint" /> Humidité: {humidity}%</p>
          </div>
        </div>
        </div>
        <div className="meteowidget_box">
          <Maps lat={lat} lng={lng} />
        </div>
      </div>
    </div>
  )
};

export default MeteoWidget;
