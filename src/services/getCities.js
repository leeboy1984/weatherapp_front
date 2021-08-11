import env from "react-dotenv";

export function getCities() {

  return fetch(env.WEATHER_API_ENDPOINT + '/cities')
      .then((response) => {
        console.log("vamos por aquí 1")
        return response.json();
      })
      .then((data) => {
        return data;
      });
}

export function getCitiesByCountry(cc) {

  return fetch(env.WEATHER_API_ENDPOINT + '/cities/' + cc)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const selectCityEmptyOption = {
          countryCode: '-1',
          countryName: 'Now you can select city'
        }
        return [selectCityEmptyOption,...data];
      });
}