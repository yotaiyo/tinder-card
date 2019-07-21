import * as React from 'react';
import style from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { AppStateType } from './AppScreenContainer';
import SwipeableView from 'react-swipeable-views';
import { FrontCard, BackCard } from './components/Card';
import { UserDetail } from './components/UserDetail';

const height = window.innerHeight;

const Wrapper = style.div`
  font-family: 'Vollkorn', serif;
  padding-top: 10px;
`;

const ButtonWrapper = style.div`
  position: fixed;
  top: ${height - 55}px;
  width: 100%;
  text-align: center;
`;

const CircleButton = style.img`
  width: 25px; 
  background: #fff;
  padding: 10px;
  border-radius: 30px;
`;

export interface UserType {
  icon: string;
  nickName: string;
  age: number;
  description: string;
  distance: number;
}

interface AppPropsType extends AppStateType {
  frontUser: UserType;
  onClickCircleButton: (
    cssTransitionIn: boolean,
    frontUser: UserType,
    users: UserType[],
    isLike: boolean
  ) => void;
  handleTouchMove: () => void;
  handleTouchEnd: (
    cssTransitionIn: boolean,
    cardHorizontalPosition: number
  ) => void;
  handleChangeIndex: (index: number) => void;
  handleTransitionEnd: (
    cssTransitionIn: boolean,
    frontUser: UserType,
    users: UserType[],
    cardHorizontalPosition: number | null,
    index: number
  ) => void;
  backUser: UserType;
  onClickInfoButton: () => void;
  onClickArrowButton: () => void;
}

export const AppScreen: React.SFC<AppPropsType> = ({
  cssTransitionIn,
  users,
  cssTransitionClassNames,
  isFadeout,
  isOnClikeCircleButton,
  cardHorizontalPosition,
  frontUser,
  onClickCircleButton,
  handleTouchMove,
  isSwipe,
  handleTouchEnd,
  index,
  handleChangeIndex,
  handleTransitionEnd,
  backUser,
  showUserDetail,
  onClickInfoButton,
  onClickArrowButton
}) => {
  return (
    <Wrapper>
      {(isSwipe || isFadeout) && (
        <BackCard
          icon={backUser.icon}
          nickName={backUser.nickName}
          age={backUser.age}
          description={backUser.description}
        />
      )}
      <CSSTransition
        in={cssTransitionIn}
        classNames={cssTransitionClassNames}
        timeout={500}
      >
        <SwipeableView
          index={index}
          onTouchMove={handleTouchMove}
          onTouchEnd={() =>
            handleTouchEnd(cssTransitionIn, cardHorizontalPosition)
          }
          onChangeIndex={index => handleChangeIndex(index)}
          onTransitionEnd={() =>
            handleTransitionEnd(
              cssTransitionIn,
              frontUser,
              users,
              cardHorizontalPosition,
              index
            )
          }
          // indexが変わらないように対策
          hysteresis={1}
          // 速くスワイプしたとき、indexが変わらないように対策
          threshold={10000000}
          disabled={showUserDetail}
        >
          <div />
          <FrontCard
            icon={frontUser.icon}
            nickName={frontUser.nickName}
            age={frontUser.age}
            description={frontUser.description}
            cssTransitionClassNames={cssTransitionClassNames}
            isFadeout={isFadeout}
            cardHorizontalPosition={cardHorizontalPosition}
            isSwipe={isSwipe}
            showUserDetail={showUserDetail}
            onClickInfoButton={onClickInfoButton}
            onClickArrowButton={onClickArrowButton}
          />
          <div />
        </SwipeableView>
      </CSSTransition>
      {showUserDetail && (
        <UserDetail
          nickName={frontUser.nickName}
          age={frontUser.age}
          description={frontUser.description}
          distance={frontUser.distance}
        />
      )}
      <ButtonWrapper>
        <CircleButton
          src={require('../../images/x_mark_red.png')}
          onClick={() => {
            const isLike = false;
            isOnClikeCircleButton
              ? null
              : onClickCircleButton(cssTransitionIn, frontUser, users, isLike);
          }}
        />
        <CircleButton
          src={require('../../images/heart_green.png')}
          style={{ marginLeft: 50 }}
          onClick={() => {
            const isLike = true;
            isOnClikeCircleButton
              ? null
              : onClickCircleButton(cssTransitionIn, frontUser, users, isLike);
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
