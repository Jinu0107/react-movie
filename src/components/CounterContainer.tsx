import React from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Counter from './Counter';
import { likeIncrement, likeDecrement, dislikeIncrement, dislikeDecrement } from 'redux/modules/counter';

const CounterContainer = ({ movieCd }: { movieCd: string }) => {
  const { likeCount, dislikeCount } = useSelector((state: RootStateOrAny) => ({
    likeCount: state.counter.movieCounts[movieCd]?.like || 0,
    dislikeCount: state.counter.movieCounts[movieCd]?.dislike || 0
  }));

  const dispatch = useDispatch();
  const onLikeIncrement = (movieCd: string) => dispatch(likeIncrement(movieCd));
  const onLikeDecrement = (movieCd: string) => dispatch(likeDecrement(movieCd));

  const onDislikeIncrement = (movieCd: string) => dispatch(dislikeIncrement(movieCd));
  const onDislikeDecrement = (movieCd: string) => dispatch(dislikeDecrement(movieCd));

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