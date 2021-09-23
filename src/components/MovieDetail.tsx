import React from 'react';
import axios from "axios";
import { useAsync } from 'react-async';
import { Spinner } from 'react-bootstrap';
import CounterContainer from './CounterContainer';
import { RouteComponentProps } from 'react-router-dom';


const key = '935570770eda3fe30629a2e2841c8a19';

const loadMovie = async ({ movieCd }: any): Promise<Object> => {
  const { data } = await axios.get(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}&movieCd=${movieCd}`);
  return data;
}

interface MatchParams {
  movieCd: string;
}

const MovieDetail = ({ match }: RouteComponentProps<MatchParams>) => {
  const { movieCd } = match.params;

  const { data, error, isLoading }: any = useAsync({
    promiseFn: loadMovie,
    movieCd
  })
  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  } else if (error) {
    return <h2>에러가 발생하였습니다.</h2>
  }

  const { movieInfo }: any = data.movieInfoResult;

  return (
    <div className="detail">
      <div className="thumbnail-box">
        <img src="/images/noImage.jpeg" />
      </div>
      <div className="info-box">
        <h2 className="title">
          영화 제목 : {movieInfo.movieNm}
        </h2>
        <div className="info">
          <div>출연 배우 </div>
          <div className="list">
            {movieInfo.actors.map((actor: any, index: number) => <span key={index}>{actor.peopleNm}</span>)}
          </div>
        </div>
        <div className="info">
          <div>장르 </div>
          <div className="list">
            {movieInfo.genres.map((genre: any, index: number) => <span key={index}>{genre.genreNm}</span>)}
          </div>
        </div>
        <div className="info">
          <div>감독 </div>
          <div className="list">
            {movieInfo.directors.map((director: any, index: number) => <span key={index}>{director.peopleNm}</span>)}
          </div>
        </div>
        <CounterContainer
          movieCd={movieCd}
        />
      </div>
    </div>
  );
};

export default MovieDetail;