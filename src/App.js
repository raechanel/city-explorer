import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      locationData: {}
    }
  }

  getLoco = async () => {
    let API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;
    let resp = await axios.get(API);
    console.log(resp.data[0])
    this.setState({ location:resp.data[0] });
  }




  handleSubmit = e => {
    e.preventDefault();

    let searchQuery = e.target.city.value
    this.setState({
      searchQuery,
    })
  }


  render() {
    console.log(this.state.searchQuery);
    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
            <label>Enter a City!
              <input name="city" type="text" />
            </label>
            <button type="submit">Explore!</button>
          </form>
          <h2>The city is: {this.state.location.display_name}</h2>
        </main>
      </>
    ); 
  }
}

export default App;
