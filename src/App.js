import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      showMapAndCityInfo: false
    }
  }

  handleInput = e => this.setState({ searchQuery: e.target.value });

  getLoco = async e => {
    e.preventDefault();

    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;


    let locoResults = await axios.get(API)
    console.log(locoResults.data)
    this.setState({
      locoData: locoResults.data[0],
      showMapAndCityInfo: true
    })
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
              <input type="text" onInput={this.handleInput} />
            </label>
            <button>Explore!</button>
          </form>

          {
            this.state.showMapAndCityInfo &&
            <article>
              <h3>{this.state.locoData.display_name}</h3>
              <img src='https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ACCESS_TOKEN}&zoom=10&center=${this.state.locoData.lat},${this.state.locoData.lon}' alt="map results" />
              <p>Latitude: {this.state.locoData.lat} Longitude: {this.state.locoData.long}</p>
            </article>
          }
        </main>
      </>
    );
  }
}
export default App;
