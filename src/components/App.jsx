import React from "react";
//import {moviesData} from "../moviesData";
import MovieItem from "../components/MovieItem";
import { API_URL, API_KEY} from "../utils/api";
import MovieTabs from "../components/MovieTabs";

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      movies : [],
      moviesWillWatch : [],
      sort_by : "revenue.desc"
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by${this.state.sort_by}`)
      .then((response) => {
        return response.json();   
      })
      .then((data) => {
        this.setState({
          movies : data.results
        });
      })

      
  };

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function(item) {
      return item.id !== movie.id;
    });
    this.setState ({
      movies : updateMovies
    });
  };


  addMovieToWillWatch = movie => {
    const updateMovie = [...this.state.moviesWillWatch, movie];
    this.setState({
      moviesWillWatch : updateMovie
    });
  };

  removeMovieFromWillWatch = movie => {
    const updateMovies = this.state.moviesWillWatch.filter(function(item) {
      return item.id !== movie.id;
    });
    this.setState ({
      moviesWillWatch : updateMovies
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by : value
    });
  };




  render() {
    console.log(this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
          <MovieTabs 
            sort_by={this.state.sort_by} 
            updateSortBy={this.updateSortBy}
          />
          </div>
          <div className="col-8">
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                <div className="col-sm-9 col-md-6 col-lg-4 mb-4">
                   <MovieItem 
                    movie={movie}
                    removeMovie={this.removeMovie} 
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                </div>
                );
              })}
            </div>
          </div>
          <div className="col-4">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
}


export default App;
