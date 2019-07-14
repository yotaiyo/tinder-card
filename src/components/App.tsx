import * as React from 'react'
import { users } from './users'
import style from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import './fadeout.css'

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
  width: ${width - 10}px;
  height: ${height - 80}px;
  background: ${(props: { icon: string }) => props.icon ? `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3)), url(${props.icon})` : null};
  background-size: cover;
  border-radius: 10px;
  margin: 0 auto;
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
  padding-top: ${height - 130}px;
  padding-left: 20px;
`

const NickName = style.span`
  font-size: 30px;
  font-weight: bold;
`

const Age = style.span`
  font-size: 20px;
  margin-left: 10px;
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

interface CardType extends UserType {
  isLike: boolean
  isFadeout: boolean
}

const Card = ({ icon, nickName, age, isLike, isFadeout }: CardType) => (
    <CardWrapper icon={icon}>
      {isFadeout ? 
        isLike ? 
            <Like>{'Like'}</Like>
          : <Nope>{'Nope'}</Nope>
          : null
      }
      <UserInfo>
        <NickName>{nickName}</NickName>
        <Age>{age}</Age>
      </UserInfo>
    </CardWrapper>
)

interface AppPropsType {}

interface UserType {
  icon: string
  nickName: string
  age: number
}

interface AppStateType {
  cssTransitionIn: boolean
  users: UserType[]
  isLike: boolean
  isFadeout: boolean
  isOnPress: boolean
}

class App extends React.Component<AppPropsType, AppStateType> {
  constructor(props: AppPropsType) {
    super(props)
    this.state={
      cssTransitionIn: true,
      // 表示するカードの枚数の最大値は5枚
      users: users.slice(0, 5),
      isLike: true,
      isFadeout: false,
      isOnPress: false
    }
  }

  render() {
    const { cssTransitionIn, users, isLike, isFadeout, isOnPress } = this.state
    const user = users[0]

    return (
      <Wrapper>
        <CSSTransition
          in={cssTransitionIn}
          classNames={isLike ? 'like' : 'nope'}
          timeout={500}
        >
          <Card icon={user.icon} nickName={user.nickName} age={user.age} isLike={isLike} isFadeout={isFadeout} />
        </CSSTransition>
        <ButtonWrapper>
          <CircleButton 
            src={'../../public/images/x_mark_red.png'}
            onClick={() => isOnPress ? null : this.onPressXButton(cssTransitionIn, user, users)}
          />
          <CircleButton 
            src={'../../public/images/heart_green.png'} 
            style={{ marginLeft: 50 }} 
            onClick={() => isOnPress ? null : this.onPressHeartButton(cssTransitionIn, user, users)}
          />
        </ButtonWrapper>
      </Wrapper>
    )
  }

  private showNextUser(user: UserType, users: UserType[]) {
    window.setTimeout(() => {
      this.setState({ users: users.slice(1, users.length).concat(user)})
      this.setState({ isFadeout: false})
      this.setState({ isOnPress: false })
    }, 500)
  }

  private onPressXButton(cssTransitionIn: boolean, user: UserType, users: UserType[]) {
    this.setState({ cssTransitionIn: !cssTransitionIn })
    this.setState({ isLike: false })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }

  private onPressHeartButton(cssTransitionIn: boolean, user: UserType, users: UserType[]) {
    this.setState({ cssTransitionIn: !cssTransitionIn })
    this.setState({ isLike: true })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }
}

export default App