class WeatherService {
  httpClient;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getCurrentWeather = async (city) => {
    let response = await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city ? city : "Antwerp"
      }&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl`
    );
    return `${response?.weather[0]?.description}, ${response?.main?.temp } °C in ${response?.name}`;
  };

  getCurrentPolution = async (city) => {
    let weatherRes = await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city ? city : "Antwerp"
      }&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl`
    );
    const lat = weatherRes?.coord?.lat;
    const lon = weatherRes?.coord?.lon;

    const pollutionRes =   await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl`
    );
    const pollutionReport = pollutionRes?.list[0];
    const CO = pollutionReport?.components?.co;
    const NO = pollutionReport?.components?.no;
    const O3 = pollutionReport?.components?.o3;
    const pm2_5 = pollutionReport?.components?.pm2_5;
    const airQuality = pollutionReport?.main?.aqi; 
    return `Gemiddelde lucht kwaliteit: ${airQuality} in ${weatherRes?.name} (1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor) (Carbon monoxide (CO) ${CO}, Ozone (O3) ${O3}, Fine particles matter (pm2_5): ${pm2_5})`;
  };

  getAllWeatherInfo = async (city) => {
    let weatherRes = await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city ? city : "Antwerp"
      }&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl`
    );
    const lat = weatherRes?.coord?.lat;
    const lon = weatherRes?.coord?.lon;
    const oneCallRes =  await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl&exclude=current,minutely,hourly`
    );
    const weatherCast = oneCallRes?.daily.map((day) => `\n ${new Date(day?.dt * 1000).toDateString()} - dag: ${day?.temp?.day} °C  nacht: ${day?.temp?.night} °C`)
    return `${weatherRes?.name} \n -- ${weatherCast.join()} `;
  };

}

export { WeatherService };
