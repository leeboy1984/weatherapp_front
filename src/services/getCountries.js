import env from "react-dotenv";

export function getCountries() {

  return fetch(env.WEATHER_API_ENDPOINT + '/countries')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const selectCountryEmptyOption = {
          countryCode: '-1',
          countryName: 'First select country'
        }
        return [selectCountryEmptyOption,...data];
      });
}