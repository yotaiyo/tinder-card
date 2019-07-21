import * as React from 'react';
import style from 'styled-components';

const width = window.innerWidth;

const Nope = style.div`
  font-size: 40px;
  font-weight: bold;
  color: red;
  transform: rotate(20deg);
  border: solid 3px red;
  padding-left: 5px;
  padding-right: 5px;
  width: 120px;
  text-align: center;
  float: right;
  margin-top: 50px;
  margin-right: 30px;
`;

const Like = style.div`
  font-size: 40px;
  font-weight: bold;
  color: green;
  transform: rotate(-20deg);
  border: solid 3px green;
  padding-left: 5px;
  padding-right: 5px;
  width: 120px;
  text-align: center;
  float: left;
  margin-top: 50px;
  margin-left: 30px;
`;

export const LikeOrNopeSquare = ({
  isFadeout,
  cssTransitionClassNames,
  cardHorizontalPosition,
  isSwipe
}) => {
  return (
    <>
      {isFadeout && !isSwipe ? (
        cssTransitionClassNames == 'right' ? (
          <Like>Like</Like>
        ) : (
          <Nope>Nope</Nope>
        )
      ) : null}
      {!isFadeout && isSwipe && cardHorizontalPosition > 55 ? (
        <Like style={{ left: width + 40 }}>Like</Like>
      ) : null}
      {!isFadeout && isSwipe && cardHorizontalPosition < -50 ? (
        <Nope style={{ right: -width + 40 }}>Nope</Nope>
      ) : null}
    </>
  );
};
