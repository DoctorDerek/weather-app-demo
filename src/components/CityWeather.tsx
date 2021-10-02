import { Component } from "react"

// to get api key: https://openweathermap.org/appid
const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY

interface CityWeatherProps {
  city: string
}

interface CityWeatherState {
  weatherResult: any
}

export class CityWeather extends Component<CityWeatherProps, CityWeatherState> {
  public constructor(props: any) {
    super(props)
    this.state = {
      weatherResult: null,
    }
  }

  public componentDidMount() {
    const { city } = this.props
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => this.setState({ weatherResult: result }))
  }

  public render() {
    const { city } = this.props
    const { weatherResult } = this.state

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Descripiton: {weatherResult.weather[0].description}</div>
      </div>
    )
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32
}
