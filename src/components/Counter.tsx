import React, { MouseEvent } from 'react';
import { Button } from 'react-bootstrap';

const Counter = ({ likeCount, dislikeCount, movieCd, onLikeIncrement, onLikeDecrement, onDislikeIncrement, onDislikeDecrement }: any) => {
  const onMouseDownLike = (e: MouseEvent): void => {
    if (e.button === 0) {
      // 좌클릭 
      onLikeIncrement(movieCd);
    } else if (e.button === 2) {
      // 우클릭
      onLikeDecrement(movieCd);
    }
  }

  const onMouseDownDislike = (e: MouseEvent): void => {
    if (e.button === 0) {
      // 좌클릭 
      onDislikeIncrement(movieCd);
    } else if (e.button === 2) {
      // 우클릭
      onDislikeDecrement(movieCd);
    }
  }

  return (
    <div className="counter">
      <Button variant="outline-success"
        onContextMenu={(e: MouseEvent): void => e.preventDefault()}
        onMouseDown={onMouseDownLike}
      >
        좋아요 {likeCount}
      </Button>

      <Button variant="outline-danger"
        onContextMenu={(e: MouseEvent): void => e.preventDefault()}
        onMouseDown={onMouseDownDislike}
      >
        싫어요 {dislikeCount}
      </Button>
    </div>
  );
};

export default Counter;