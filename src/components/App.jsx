import React from "react";
//import {moviesData} from "../moviesData";
import MovieItem from "../components/MovieItem";
import { API_URL, API_KEY} from "../utils/api";
import MovieTabs from "../components/MovieTabs";
import PageSwitching from "../components/PageSwitching";
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      page : 1,
      totalPages : '',
      movies : [],
      moviesWillWatch : [],
      sort_by : "revenue.desc"
    };
  }

  getMoviesForAPI = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
    .then((response) => {
      return response.json();   
    })
    .then((data) => {
      this.setState({
        //page : data.page,
        totalPages : data.total_pages,
        movies : data.results
      });
    });
  };

  componentDidMount() {
    this.getMoviesForAPI();    
  };

  componentDidUpdate(prevProps, prevState){
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMoviesForAPI();    
    }
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

  nextPage = () => {
    this.setState({
      page : this.state.page + 1
    });
    setTimeout(() => {
        this.getMoviesForAPI();
    }, 0);
    
  }
  
  prevPage = () => {
    if (this.state.page !== 1) {
      this.setState({
        page : this.state.page - 1
      });
      setTimeout(() => {
        this.getMoviesForAPI();
      }, 0);
      
    }
  }
  
  resettingThePageCounter = () =>{
    this.setState({
      page : this.setState.page = 1
    });
    setTimeout(() => {
    this.getMoviesForAPI();
    }, 0);
  }


  render() {
    console.log(this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 mb-4 mt-4">
              <MovieTabs 
                sort_by={this.state.sort_by} 
                updateSortBy={this.updateSortBy}
                resettingThePageCounter={this.resettingThePageCounter}
              />
          </div>
          <div className="col-10">
            <div className="row">
              <PageSwitching 
                page={this.state.page}
                totalPages={this.state.totalPages}
                nextPage={this.nextPage}
                prevPage={this.prevPage}
              />
              {this.state.movies.map((movie) => {
                return (
                <div className="col-sm-6 col-md-6 col-lg-4 mb-4">
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
            <PageSwitching 
                page={this.state.page}
                totalPages={this.state.totalPages}
                nextPage={this.nextPage}
                prevPage={this.prevPage}
              />
          </div>
         
          <div className="col-2">
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
