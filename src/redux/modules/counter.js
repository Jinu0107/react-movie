// 액션 타입 정의
const LIKE_INCREMENT = 'counter/LIKE_INCREMENT';
const LIKE_DECREMENT = 'counter/LIKE_DECREMENT';
const DISLIKE_INCREMENT = 'counter/DISLIKE_INCREMENT';
const DISLIKE_DECREMENT = 'counter/DISLIKE_DECREMENT';

// 액션 생성 함수 정의
export const likeIncrement = (movieCd) => ({ type: LIKE_INCREMENT, movieCd });
export const likeDecrement = (movieCd) => ({ type: LIKE_DECREMENT, movieCd });

export const dislikeIncrement = (movieCd) => ({ type: DISLIKE_INCREMENT, movieCd });
export const dislikeDecrement = (movieCd) => ({ type: DISLIKE_DECREMENT, movieCd });

// 초기 상태 정의
const initialState = {
  movieCounts: {

  }
};

export default function Counter(state = initialState, action) {
  let { movieCd } = action;
  let { movieCounts } = state;
  let movieCount = movieCounts[movieCd] || {};
  let count = 0;
  switch (action.type) {
    case LIKE_INCREMENT:
      // 좋아요 증가
      count = (movieCounts[movieCd]?.like || 0) + 1;
      return {
        ...state,
        movieCounts: {
          ...movieCounts,
          [movieCd]: {
            ...movieCount,
            like: count
          }
        },
      };
    case LIKE_DECREMENT:
      // 좋아요 감소
      count = (movieCounts[movieCd]?.like || 0) - 1;
      return {
        ...state,
        movieCounts: {
          ...movieCounts,
          [movieCd]: {
            ...movieCount,
            like: count
          }
        },
      };
    case DISLIKE_INCREMENT:
      // 싫어요 증가
      count = (movieCounts[movieCd]?.dislike || 0) + 1;
      return {
        ...state,
        movieCounts: {
          ...movieCounts,
          [movieCd]: {
            ...movieCount,
            dislike: count
          }
        },
      };
    case DISLIKE_DECREMENT:
      // 싫어요 감소
      count = (movieCounts[movieCd]?.dislike || 0) - 1;
      return {
        ...state,
        movieCounts: {
          ...movieCounts,
          [movieCd]: {
            ...movieCount,
            dislike: count
          }
        },
      };
    default:
      return state;
  }
}