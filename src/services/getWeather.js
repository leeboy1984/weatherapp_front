import env from "react-dotenv";

export function getCurrentWeather(city) {

  return fetch(env.WEATHER_API_ENDPOINT + '/weather/' + city + "/current")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.weather;
      });
}

export function getWeatherPrediction(city) {

  return fetch(env.WEATHER_API_ENDPOINT + '/weather/' + city)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let headerData = [{icon:'', timestamp: ''}];
        let bodyData = [[{value: 'Temperature'}],[{value: 'Temp. Max'}],[{value: 'Temp. Min'}],[{value: 'Temp. Feels'}],[{value: 'Humidity'}]];

        //Weather Transmutation
        console.log("Obtained Prediction:")
        console.log(data)
        for (var i = 0; i < data.length; i++){
          let tmpHeader = {icon: data[i].weather.weather[0].icon, timestamp: data[i].weather.dt_txt}
          headerData.push(tmpHeader);

          bodyData[0].push({value: Math.round(data[i].weather.main.temp) + "º" });
          bodyData[1].push({value: Math.round(data[i].weather.main.temp_max) + "º" });
          bodyData[2].push({value: Math.round(data[i].weather.main.temp_min) + "º" });
          bodyData[3].push({value: Math.round(data[i].weather.main.feels_like) + "º" });
          bodyData[4].push({value: Math.round(data[i].weather.main.humidity) + "%" });
        }

        console.log("HeaderData");
        console.log(headerData);
        return {header: headerData, body: bodyData};
      });
}