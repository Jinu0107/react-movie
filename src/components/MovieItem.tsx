import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CounterContainer from './CounterContainer';


const MovieItem = ({ movieCd, movieNm, genreAlt }: any) => {
  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Img variant="top" src="/images/noImage.jpeg" />
      <Card.Body>
        <Card.Title>{movieNm}</Card.Title>
        <Card.Text>
          영화 장르 : {genreAlt}
        </Card.Text>
        <Link to={`/detail/${movieCd}`}>
          <Button variant="primary">자세히보기</Button>
        </Link>
        <CounterContainer
          movieCd={movieCd}
        />
      </Card.Body>
    </Card>
  );
};

export default MovieItem;