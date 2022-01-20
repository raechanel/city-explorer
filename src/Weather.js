import React from "react";

class Weather extends React.Component {

  render() {
    return (
      this.props.weather.map(day => (
        <>
          <p>{day.date}</p>
          <p>{day.description}</p>
        </>
      ))
    )

  }
}

export default Weather;
