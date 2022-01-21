import React from "react";
import axios from "axios";
import Weather from './Weather.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      showMapAndCityInfo: false,
      renderError: false,
      errorMessage: '',
      locoData: {},
      latitude: '',
      longitude: '',
      weatherData: []
    }
  }

  handleInput = e => this.setState({ searchQuery: e.target.value });

  getLoco = async e => {
    e.preventDefault();
    
    try {
      let apiUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

      let locoResults = await axios.get(apiUrl)
      console.log(locoResults.data)
      
      this.setState({
        locoData: locoResults.data[0],
        showMapAndCityInfo: true
      })
      console.log(this.state.locoData);
    } catch(error) {
      this.setState ({
        renderError: true, 
        errorMessage: `Error: ${error.response.status}, ${error.response.data.error}`
      })
    }
     this.getWeather(this.state.locoData.lat, this.state.locoData.lon); 
  }

  getWeather = async (lat, lon) => {
    try {
      let weatherApi = await axios.get(`${process.env.REACT_APP_SERVER}/weather`, { params: {lat: lat, lon: lon, searchQuery: this.state.searchQuery}})

      this.setState({
        weatherData: weatherApi.data,
      })
    } catch(error) {
      this.setState({
        renderError: true,
        errorMessage: 'Unable to connect to server'
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>
        <main>
          <form onSubmit={this.getLoco}>
            <label>Enter a City!
              <input type="text" onInput={this.handleInput} placeholder= "Ex. Trenton 📍" />
            </label>
            <button>Explore!</button>
          </form>
          <h3>{this.state.errorMessage}</h3>
          {
            this.state.showMapAndCityInfo &&
            <article>
              <h3>{this.state.locoData.display_name}</h3>
              <img src= {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ACCESS_TOKEN}&zoom=10&center=${this.state.locoData.lat},${this.state.locoData.lon}`} alt="map results" />
              <p>Latitude: {this.state.locoData.lat} Longitude: {this.state.locoData.lon}</p>
            </article>
          }
          <Weather 
           weather={this.state.weatherData}
          />
        </main>
      </>
    );
  }
}
export default App;
