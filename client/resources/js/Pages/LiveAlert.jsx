import React, { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer';
import WeatherMap from './components/WeatherMap';

const LiveAlert = ( { weather } ) => {
    const today = weather.current;
    const [hourlyForecast, setHourlyForecast] = useState(weather.forecast.forecastday[0].hour);
    const loc = weather.location;
    const curr_date = new Date(weather.location.localtime);
    const curr_fullDate = `${curr_date.toLocaleString('en-US', {month: 'long'})} ${curr_date.getDate()}, ${curr_date.getFullYear()}`;
    const curr_day = curr_date.toLocaleDateString('en-US', { weekday: 'long'});
    const curr_time = curr_date.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
    const daily_forecast = weather.forecast.forecastday;

    const handleHourlyForecast = (hour) => {
        setHourlyForecast(hour);
    }

    const handleCurrentHourlyForecast = () => {
        setHourlyForecast(weather.forecast.forecastday[0].hour);
    }


  return (
    <div>
        <Nav/>
        <div className="forecast-container px-6 pb-6">
            <p className='font-bold text-3xl mt-8'>Weather Forecast</p>
            <div className="forecast grid grid-cols-4 mt-4 gap-4">
                <div className="forecast__sec-1 col-span-4 lg:col-span-1" onClick={handleCurrentHourlyForecast}>
                    <div className="current bg-clgreen hover:bg-cgreen ctransition rounded-xl p-4">
                        <div className="header">
                            <div className="date flex justify-between items-start">
                                <div className="day">
                                    <p className='text-4xl font-bold'>{curr_day}</p>
                                    <p className='text-2xl'>{curr_time}</p>
                                    <p>{curr_fullDate}</p>
                                </div>
                                <div className="loc flex justify-center space-x-3 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9M10 11a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clipRule="evenodd"/></svg>
                                    <p>{loc.name}, {loc.region}</p>
                                </div>
                            </div>
                            <div className="header__temp flex justify-between items-center">
                                <div>
                                    <p className='text-6xl md:text-7xl font-font2 font-bold'>{today.temp_c}&#176; C</p>
                                    <p>{today.condition.text}</p>
                                </div>
                                <img src={today.condition.icon} className='w-[150px]'/>
                            </div>
                            <div className="info mt-3">
                                <p>Wind: <span>{today.wind_dir},</span> {today.wind_kph} kp&#47;h</p>
                                <p>Feels Like: <span>{today.feelslike_c}&#176; C</span></p>
                                <p>Humidity: <span>{today.humidity}&#37;</span></p>
                                <p>Pressure: <span>{today.pressure_mb} MB</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="forecast__sec-2 col-span-4 lg:col-span-3 flex
                w-full flex-col">
                    <div className='mb-2'>
                        <p className='font-bold text-gray-500'>Daily Forecast</p>
                    </div>
                    <div className="daily__forecast flex h-full space-x-2 overflow-x-auto cscrollbar">
                        {
                            daily_forecast.slice(1).map((forecast) => {
                                const date = new Date(forecast.date);
                                const day = date.toLocaleString('en-US', {weekday: 'long'});
                                const f_date = `${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`;
                                const f_day = forecast.day;

                                return (
                                    <div className='text-center bg-cgray min-w-[130px] md:min-w-[140px] lg:min-w-[150px] p-3 my-2 rounded-xl flex flex-col justify-around cursor-pointer hover:bg-gray-200 ctransition' onClick={() => handleHourlyForecast(forecast.hour)}>
                                        <div className="header">
                                            <p className='font-bold'>{day}</p>
                                            <p className='text-sm'>{f_date}</p>
                                        </div>
                                        <div className="body">
                                            <div className="img_wrapper justify-self-center w-[80px] lg:w-[100px]">
                                                <img src={f_day.condition.icon} alt="" className='w-full h-full'/>
                                            </div>
                                            <p className='text-2xl font-bold mt-4'>{f_day.avgtemp_c}&#176; C</p>
                                        </div>
                                        <div className="footer">
                                            <p className='text-sm lg:text-base'>{f_day.condition.text}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="forecast__sec-3 grid grid-cols-3 mt-8">
                <div className="hourly col-span-3 lg:col-span-1">
                    <p className='font-bold mb-4 text-gray-500'>Hourly Forecast</p>
                    <div className="hourly__forecast h-[400px] overflow-y-auto cscrollbar">
                        {hourlyForecast.map((forecast) => {
                            const date = new Date(forecast.time);
                            const time = date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12:  true});
                            const f_date = `${date.toLocaleString('en-US', {month: 'long'})} ${date.getDate()}, ${date.getFullYear()}`;

                            return (
                                <div className="forecast grid grid-cols-3 items-center pr-4 mb-2 h-[100px] lg:h-[120px] px-2 py-3 mr-2 rounded-xl bg-cgray ctransition">
                                    <div className="time">
                                        <p className='text-xl md:text-2xl font-bold'>{time}</p>
                                        <p className='text-sm'>{f_date}</p>
                                    </div>
                                    <div className="condition__icon text-center space-x-2">
                                        <p className='text-sm text-gray-500'>Temperature</p>
                                        <p className='text-xl md:text-2xl font-bold'>{forecast.temp_c}&#176; C</p>
                                    </div>
                                    <div className="condition__text flex justify-center flex-col items-center text-center">
                                        <div className="icon-wrapper w-[35px]">
                                            <img src={forecast.condition.icon} alt={forecast.time} className='w-full h-full'/>
                                        </div>
                                        <p className='text-base md:text-lg'>{forecast.condition.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="map col-span-3 lg:col-span-2 my-4 md:mx-2 md:my-0 rounded-xl text-cgray h-full w-full overflow-hidden">
                    <WeatherMap />
                </div>
            </div>
        </div>
        {/* <div className="disasters text-cwhite  text-2xl flex justify-center items-center h-[380px] bg-cblack rounded-xl m-4">
            <p>Coming Soon . . .</p>
        </div> */}
    </div>
  )
}

export default LiveAlert
