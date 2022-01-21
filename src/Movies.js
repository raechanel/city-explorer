import React from "react";

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map (idx => (
        <div key={idx}>
          <p>{this.title}</p>
          <p>{this.genre}</p>
        </div>
      ))
    )

  }
}

export default Movies;
