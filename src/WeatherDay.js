import React from "react";
import { ListGroup } from "react-bootstrap";

class WeatherDay extends React.Component {
  render() {
    return (
      <ListGroup.Item>
        <p>{this.props.day.date}</p>
        <p>{this.props.day.description}</p>
        <p>{this.props.day.low}</p>
        <p>{this.props.day.high}</p>
      </ListGroup.Item>
    )
  }
}

export default WeatherDay;
