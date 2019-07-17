import * as React from 'react'
import style from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { AppStateType } from './AppScreenContainer'
import SwipeableView from 'react-swipeable-views'

const height = window.innerHeight
const width = window.innerWidth

const Wrapper = style.div`
  font-family: 'Vollkorn', serif;
  width: ${width}px;
  height: ${height}px;
  background-color: #F5F5F5;
  padding-top: 10px;
`

const CardWrapper = style.div`
  height: ${height - 80}px;
  background: ${(props: { icon: string }) => props.icon ? `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5)), url(${props.icon})` : null};
  background-size: cover;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
`

const Nope = style.div`
  font-size: 40px;
  font-weight: bold;
  top: 50px;
  right: 40px;
  color: red;
  transform: rotate(20deg);
  position: absolute;
  border: solid 3px red;
  padding-left: 5px;
  padding-right: 5px;
`

const Like = style.div`
  font-size: 40px;
  font-weight: bold;
  top: 50px;
  left: 40px;
  color: green;
  transform: rotate(-20deg);
  position: absolute;
  border: solid 3px green;
  padding-left: 5px;
  padding-right: 5px;
`

const UserInfo = style.div`
  color: #fff;
  padding-top: ${height - 210}px;
  width: ${width - 70}px;
  margin-left: 20px;
`

const NickName = style.span`
  font-size: 35px;
  font-weight: bold;
`

const Age = style.span`
  font-size: 25px;
  margin-left: 10px;
`

const Description = style.div`
  overflow: hidden;
  height: 3.6em;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
`

const ButtonWrapper = style.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const CircleButton = style.img`
  width: 25px; 
  margin-top: 15px;
  background: #fff;
  padding: 10px;
  border-radius: 30px;
`

export interface UserType {
  icon: string
  nickName: string
  age: number
  description: string
}

const LikeOrNopeSquare = ({ isFadeout, isLike, cardHorizontalPosition, isSwipe }) => {
  return(
    <>
      {isFadeout && !isSwipe ? 
        isLike ? 
          <Like>Like</Like>
          : <Nope>Nope</Nope>
      : null
      }
      {!isFadeout && isSwipe &&
        cardHorizontalPosition > 50 ?
          <Like style={{ left: width + 40 }}>Like</Like>
          : null
      }
      {!isFadeout && isSwipe &&   
        cardHorizontalPosition < -50 ?
          <Nope style={{ right: -width + 40 }} >Nope</Nope>
          : null            
      }
    </>
  )
}

interface FrontCardType extends UserType {
  isLike: boolean
  isFadeout: boolean
  cardHorizontalPosition: number | null
  isSwipe: boolean
}

const FrontCard = ({ icon, nickName, age, description, isLike, isFadeout, cardHorizontalPosition, isSwipe }: FrontCardType) => (
  <CardWrapper icon={icon} id={'card'}>
    <LikeOrNopeSquare isFadeout={isFadeout} isLike={isLike} cardHorizontalPosition={cardHorizontalPosition} isSwipe={isSwipe} />
    <UserInfo>
        <NickName>{nickName}</NickName>
        <Age>{age}</Age>
        <Description>{description}</Description>        
    </UserInfo>
  </CardWrapper>
)

const BackCard = ({ icon, nickName, age, description }: UserType) => (
  <CardWrapper icon={icon}>
    <UserInfo>
        <NickName>{nickName}</NickName>
        <Age>{age}</Age>
        <Description>{description}</Description>
    </UserInfo>
  </CardWrapper>
)

interface AppPropsType extends AppStateType {
  frontUser: UserType,
  onPressXButton: (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => void
  onPressHeartButton: (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => void
  handleTouchMove: () => void
  handleTouchEnd: (frontUser: UserType, users: UserType[], cardHorizontalPosition: number | null, index: number) => void
  handleChangeIndex: (index: number) => void
  handleTransitionEnd: (index: number) => void
  backUser: UserType
}

export const AppScreen: React.SFC<AppPropsType> = ({
  cssTransitionIn,
  users,
  isLike,
  isFadeout,
  isOnPress,
  cardHorizontalPosition,
  frontUser,
  onPressXButton,
  onPressHeartButton,
  handleTouchMove,
  isSwipe,
  handleTouchEnd,
  index,
  handleChangeIndex,
  handleTransitionEnd,
  backUser
}) => {
    return (
        <Wrapper>
          <SwipeableView 
            index={index}
            onTouchMove={() => handleTouchMove()} 
            onTouchEnd={() => handleTouchEnd(frontUser, users, cardHorizontalPosition, index)} 
            onChangeIndex={(index) => handleChangeIndex(index)}
            onTransitionEnd={() => handleTransitionEnd(index)}
            hysteresis={100}
            style={{ position: 'absolute', left: 0, right: 0, margin: 'auto' }}
          >  
            <div />
              <CSSTransition
                in={cssTransitionIn}
                classNames={isLike ? 'like' : 'nope'}
                timeout={500}
              >
                <FrontCard 
                  icon={frontUser.icon} 
                  nickName={frontUser.nickName} 
                  age={frontUser.age} 
                  description={frontUser.description}
                  isLike={isLike} 
                  isFadeout={isFadeout} 
                  cardHorizontalPosition={cardHorizontalPosition} 
                  isSwipe={isSwipe}
                />
              </CSSTransition> 
            <div />
          </SwipeableView> 
          <BackCard 
            icon={backUser.icon} 
            nickName={backUser.nickName} 
            age={backUser.age}
            description={backUser.description}
          />
          <ButtonWrapper>
            <CircleButton 
                src={'../../public/images/x_mark_red.png'}
                onClick={() => isOnPress ? null : onPressXButton(cssTransitionIn, frontUser, users)}
            />
            <CircleButton 
                src={'../../public/images/heart_green.png'} 
                style={{ marginLeft: 50 }} 
                onClick={() => isOnPress ? null : onPressHeartButton(cssTransitionIn, frontUser, users)}
            />
          </ButtonWrapper>
      </Wrapper>
    )
}