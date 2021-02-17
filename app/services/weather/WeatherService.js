class WeatherService {
  httpClient;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getCurrentWeather = async (city) => {
    console.log("CITY", city);
    let response = await this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city ? city : "Antwerp"
      }&appid=a56e4906698ac4909f50c2b0f9f72647&units=metric&lang=nl`
    );
    console.log(response)
    return `${response?.weather[0]?.description}, ${response?.main?.temp } °C in ${response?.name}`;
  };
}

export { WeatherService };
