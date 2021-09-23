import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const key = "935570770eda3fe30629a2e2841c8a19";

const reducer = (state: any, action: any): Object => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const MovieList = ({ keyword, sort }: { keyword: string; sort: any }) => {
  const { movieCounts } = useSelector((state: any) => ({
    movieCounts: state.counter.movieCounts,
  }));

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: null,
    error: null,
  });

  const loadMovieList = async (): Promise<void> => {
    try {
      dispatch({ type: "LOADING" });
      const { data } = await axios.get(
        `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${key}&itemPerPage=100&movieNm=${keyword}`
      );
      dispatch({ type: "SUCCESS", data });
    } catch (error) {
      dispatch({ type: "Error", error });
    }
  };

  const { data, error, loading }: any = state;

  useEffect(() => {
    loadMovieList();
  }, [keyword, sort]);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (error) {
    return <h2>에러가 발생하였습니다.</h2>;
  }
  let { movieList } = data.movieListResult;

  let defaultObj = { like: 0, dislike: 0 };
  movieList = movieList.map((movie: any) => {
    let { like, dislike } = movieCounts[movie.movieCd] || defaultObj;
    return { ...movie, like, dislike };
  });

  if (sort.isSorting && sort.target === "name") {
    movieList.sort((a: any, b: any) => {
      return a.movieNm < b.movieNm ? -1 : a.movieNm > b.movieNm ? 1 : 0;
    });
  }

  if (sort.isSorting && sort.target === "like") {
    movieList.sort((a: any, b: any) => {
      return a.like > b.like ? -1 : a.like < b.like ? 1 : 0;
    });
  }

  return (
    <div>
      <Row>
        {movieList.map((movie: any) => (
          <MovieItem {...movie} key={movie.movieCd} />
        ))}
      </Row>
    </div>
  );
};

export default MovieList;
