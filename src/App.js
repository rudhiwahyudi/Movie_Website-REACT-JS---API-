
import { useEffect, useState } from 'react';
import './App.css';
import {getData, searchMovie} from './api'

const App = () => {

  const [popularMvovie, setPopularMovie] = useState([])

  useEffect (() =>{
    getData().then((result) => {
      setPopularMovie(result)
    })
  }, [])

  const PopularMovieList = () =>{
    return popularMvovie.map((movie, i)=> {
      return(         
      <div className='movie-wrapper' key={i}>
          <img className='movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
          <div className='movie-title'>{movie.title}</div>
          <div className='movie-date'>Relase : {movie.release_date}</div>
          <div className='movie-rate'>Rate : {movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async(q) =>{

    if (q.length > 3){
      const cari = await searchMovie(q)
      setPopularMovie (cari.results)

    }
  }

  console.log ({popularMvovie: popularMvovie})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Film Keluarga</h1>
        <input 
        placeholder='cari film ' 
        className='movie-search'
        onChange={({target}) => search(target.value)}
        />
        <div className='movie-container'>
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
