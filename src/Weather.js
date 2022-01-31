import React from "react";
import { ListGroup } from "react-bootstrap";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {

  render() {
    console.log('this is the array', this.props.weather);
    return (
      <ListGroup>
        {this.props.weather.map((day, idx) => (
          <WeatherDay key={idx} day={day} />
        ))}
      </ListGroup>
    )

  }
}
export default Weather;
