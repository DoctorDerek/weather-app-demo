import { Component } from "react"

// to get api key: https://openweathermap.org/appid
const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY

interface CityWeatherProps {
  city?: string
}

interface CityWeatherState {
  weatherResult: any
}

export default class CityWeather extends Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props: any) {
    super(props)
    this.state = {
      weatherResult: null,
    }
  }

  public componentDidMount() {
    const { city } = this.props
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((r) => r.json())
        .then((result) => this.setState({ weatherResult: result }))
    }
  }

  public render() {
    const { city } = this.props
    const { weatherResult } = this.state
    if (!city) return null
    if (!weatherResult) return null

    return (
      <div>
        <h1>{city}</h1>
        <div>
          Temperature: {KtoF(weatherResult.main.temp).toFixed(0)} &#8457;
        </div>
        <div>Description: {weatherResult.weather[0].description}</div>
      </div>
    )
  }
}

export function KtoF(tempKelvin: number) {
  return Math.round(((tempKelvin - 273.15) * 9) / 5 + 32)
}
