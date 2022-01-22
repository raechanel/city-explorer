import React from "react";

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map ((movie, idx) => (
        <div key={idx}>
          <p>{movie.title}</p>
          <img src={movie.imageUrl} alt={movie.title}></img>
          <p>{movie.overview}</p>
          <p>{movie.releaseDate}</p>
        </div>
      ))
    )

  }
}

export default Movies;
