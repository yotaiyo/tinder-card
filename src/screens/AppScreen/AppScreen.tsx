import * as React from 'react'
import style from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { AppStateType } from './AppScreenContainer'
import SwipeableView from 'react-swipeable-views'

const height = window.innerHeight
const width = window.innerWidth

const Wrapper = style.div`
  font-family: 'Vollkorn', serif;
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
  width: ${width - 50}px;
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

const DescriptionAndInfoButtonWrapper = style.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TwoLinesDescription = style.div`
  overflow: hidden;
  height: 3.6em;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
`

const InfoButton = style.img`
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
`

const ButtonWrapper = style.div`
  position: fixed;
  top: ${height - 50}px;
  width: 100%;
  text-align: center;
`

const CircleButton = style.img`
  width: 25px; 
  background: #fff;
  padding: 10px;
  border-radius: 30px;
`

const UserDetailWrapper = style.div`
  margin-top: 10px;
  margin-bottom: 70px;
`

const NickNameAndAgeWrapper = style.div`
  margin-left: 10px;
`

const DistanceWrapper = style.div`
  border-bottom: solid 1px #C0C0C0;
  padding-left: 10px;
  padding-bottom: 10px; 
`

const LocationIcon = style.img`
  width: 15px;
  height: 15px;
`

const Distance = style.span`
  margin-left: 5px;
`

const Description = style.div`
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
  margin-left: 10px;
  margin-top: 10px;
`

export interface UserType {
  icon: string
  nickName: string
  age: number
  description: string
  distance: number
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

interface FrontCardType extends Pick<UserType, 'icon' | 'nickName' | 'age' | 'description'> {
  isLike: boolean
  isFadeout: boolean
  cardHorizontalPosition: number | null
  isSwipe: boolean
  showUserDetail: boolean
  onClickInfoButton: () => void
}

const FrontCard = ({ 
  icon, 
  nickName, 
  age, 
  description, 
  isLike, 
  isFadeout, 
  cardHorizontalPosition, 
  isSwipe, 
  showUserDetail, 
  onClickInfoButton 
}: FrontCardType) => (
  <CardWrapper icon={icon} id={'card'}>
    <LikeOrNopeSquare isFadeout={isFadeout} isLike={isLike} cardHorizontalPosition={cardHorizontalPosition} isSwipe={isSwipe} />
      { !showUserDetail &&
        <UserInfo>
          <NickName>{nickName}</NickName>
          <Age>{age}</Age>
          <DescriptionAndInfoButtonWrapper>
            <TwoLinesDescription>{description}</TwoLinesDescription>
            <InfoButton src={'../../public/images/info.png'} onClick={onClickInfoButton}/>
          </DescriptionAndInfoButtonWrapper>
        </UserInfo>
      }
  </CardWrapper>
)

const BackCard = ({ icon, nickName, age, description }: Pick<UserType, 'icon' | 'nickName' | 'age' | 'description'>) => (
  <CardWrapper icon={icon}>
    <UserInfo>
        <NickName>{nickName}</NickName>
        <Age>{age}</Age>
        <TwoLinesDescription>{description}</TwoLinesDescription>
    </UserInfo>
  </CardWrapper>
)

const UserDetail = ({ nickName, age, description, distance }: Pick<UserType, 'nickName' | 'age' | 'description' | 'distance'>) => (
  <UserDetailWrapper>
    <NickNameAndAgeWrapper>
      <NickName>{nickName}</NickName>
      <Age>{age}</Age>
    </NickNameAndAgeWrapper>
    <DistanceWrapper>
      <LocationIcon src='../../public/images/location.png'/>
      <Distance>{`${distance} km 先`}</Distance>
    </DistanceWrapper>
    <Description>{description}</Description>
  </UserDetailWrapper>
)

interface AppPropsType extends AppStateType {
  frontUser: UserType,
  onClickXButton: (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => void
  onClickHeartButton: (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => void
  handleTouchMove: () => void
  handleTouchEnd: (frontUser: UserType, users: UserType[], cardHorizontalPosition: number | null, index: number) => void
  handleChangeIndex: (index: number) => void
  handleTransitionEnd: (index: number) => void
  backUser: UserType
  onClickInfoButton: () => void
}

export const AppScreen: React.SFC<AppPropsType> = ({
  cssTransitionIn,
  users,
  isLike,
  isFadeout,
  isonClick,
  cardHorizontalPosition,
  frontUser,
  onClickXButton,
  onClickHeartButton,
  handleTouchMove,
  isSwipe,
  handleTouchEnd,
  index,
  handleChangeIndex,
  handleTransitionEnd,
  backUser,
  showUserDetail,
  onClickInfoButton
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
                showUserDetail={showUserDetail}
                onClickInfoButton={onClickInfoButton}
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
          { showUserDetail &&
            <UserDetail 
              nickName={frontUser.nickName} 
              age={frontUser.age} 
              description={frontUser.description}
              distance={frontUser.distance}
            />
          }
          <ButtonWrapper>
            <CircleButton 
                src={'../../public/images/x_mark_red.png'}
                onClick={() => isonClick ? null : onClickXButton(cssTransitionIn, frontUser, users)}
            />
            <CircleButton 
                src={'../../public/images/heart_green.png'} 
                style={{ marginLeft: 50 }} 
                onClick={() => isonClick ? null : onClickHeartButton(cssTransitionIn, frontUser, users)}
            />
          </ButtonWrapper>
      </Wrapper>
    )
}