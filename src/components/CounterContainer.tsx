import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from './Counter';
import { likeIncrement, likeDecrement, dislikeIncrement, dislikeDecrement } from 'redux/modules/counter';

const CounterContainer = ({ movieCd }: { movieCd: number }) => {
  const { likeCount, dislikeCount } = useSelector((state: any) => ({
    likeCount: state.counter.movieCounts[movieCd]?.like || 0,
    dislikeCount: state.counter.movieCounts[movieCd]?.dislike || 0
  }));

  const dispatch = useDispatch();
  const onLikeIncrement = (movieCd: any) => dispatch(likeIncrement(movieCd));
  const onLikeDecrement = (movieCd: any) => dispatch(likeDecrement(movieCd));

  const onDislikeIncrement = (movieCd: any) => dispatch(dislikeIncrement(movieCd));
  const onDislikeDecrement = (movieCd: any) => dispatch(dislikeDecrement(movieCd));

  return (
    <Counter
      likeCount={likeCount}
      dislikeCount={dislikeCount}
      movieCd={movieCd}
      onLikeIncrement={onLikeIncrement}
      onLikeDecrement={onLikeDecrement}
      onDislikeIncrement={onDislikeIncrement}
      onDislikeDecrement={onDislikeDecrement}
    />
  );
}

export default CounterContainer;