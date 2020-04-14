import React from "react";
import { API_URL_IMAGE } from "../utils/api";
//import nullPoster from "../../public/img/undefined.jpg";
class MovieItem extends React.Component {
    constructor() {
        super()
    
        this.state = {
          willWatch : false
        };
    }

    getMovieImage = (movie) => {
        const moviePoster =  movie.poster_path ? API_URL_IMAGE + movie.poster_path : "https://s3-eu-west-1.amazonaws.com/trailers.app/trailers/logos/000/000/197/index/no-poster.jpg?1484574633";
        return moviePoster; 
    };

    

    render() {
        const { 
            movie, 
            removeMovie, 
            addMovieToWillWatch, 
            removeMovieFromWillWatch
        } = this.props;
        
        return (
        <div className="card">
            <img
                className="card-img-top"
                src={this.getMovieImage(movie)}
                alt=""
            />
            <div className="card-body">
                <h6 className="card-title">{movie.title}</h6>
                <p className="mb-2">Rating: {movie.vote_average}</p>
                <div className="d-flex justify-content-between align-items-center">
                    {this.state.willWatch ? (
                        <button type="button" 
                        className="btn btn-secondary" 
                        onClick={()=> {
                            this.setState({
                                willWatch : false
                            });
                            removeMovieFromWillWatch(movie);
                        }}>
                        Remove Will Watch
                        </button> 
                    ) : (
                        <button
                                type="button" 
                                className="btn btn-success" 
                                onClick={() => {
                                this.setState({
                                    willWatch : true
                                });
                                addMovieToWillWatch(movie);
                                }}>
                            add Will Watch
                        </button>
                        
                    )} 
                    <button type="button"
                        className="btn btn-danger ml-3" 
                        onClick={removeMovie.bind(null, movie)}>
                        Delete Movie
                    </button>
                </div>
            
            </div>
        </div>
        );
    }
}


export default MovieItem;