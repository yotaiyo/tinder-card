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
  top: ${height - 120}px;
  left: 30px;
  position: absolute;
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

interface CardType extends UsersType {
  isLike: boolean
}

const Card = ({ icon, nickName, age, isLike }: CardType) => (
    <CardWrapper icon={icon}>
      {isLike ?
        <Like>{'Like'}</Like>
      : <Nope>{'Nope'}</Nope>
      }
      <UserInfo>
        <NickName>{nickName}</NickName>
        <Age>{age}</Age>
      </UserInfo>
    </CardWrapper>
)

interface AppPropsType {}

interface UsersType {
  icon: string
  nickName: string
  age: number
}

interface AppStateType {
  showCard: boolean
  users: UsersType[]
  isLike: boolean
}

class App extends React.Component<AppPropsType, AppStateType> {
  constructor(props: AppPropsType) {
    super(props)
    this.state={
      showCard: true,
      // 表示するカードの枚数の最大値は5枚
      users: users.slice(0, 5),
      isLike: true
    }
  }

  render() {
    const { showCard, users, isLike } = this.state
    const user = users[0]

    return (
      <Wrapper>
        <CSSTransition
          in={showCard}
          classNames={isLike ? 'like' : 'nope'}
          timeout={300}
        >
          <Card icon={user.icon} nickName={user.nickName} age={user.age} isLike={isLike} />
        </CSSTransition>
        <ButtonWrapper>
          <CircleButton src={'../../public/images/x_mark_red.png'}
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ isLike: false })
              this.setState({ users: users.slice(1, users.length).concat(user)})
            }}
          />
          <CircleButton src={'../../public/images/heart_green.png'} 
            style={{ marginLeft: 50 }} 
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ isLike: true })
              this.setState({ users: users.slice(1, users.length).concat(user)})
            }}
          />
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default App