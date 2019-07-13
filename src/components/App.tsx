import * as React from 'react'
import { users } from './users'
import style from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

const height = window.innerHeight
const width = window.innerWidth

const Wrapper = style.div`
  font-family: 'Vollkorn', serif;
`

const CardWrapper = style.div`
  background-color: #FFF;
  width: ${width - 40}px;
  height: ${height - 120}px;
  background: ${(props: { icon: string }) => props.icon ? `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3)), url(${props.icon})` : null};
  background-size: cover;
  border-radius: 10px;
  margin: 0 auto;
`

const Body = style.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  top: ${height - 180}px;
  left: 30px;
  position: absolute;
`

const ButtonWrapper = style.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Button = style.div`
  background-color: #003399;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px; 
  margin-top: 20px;
`

const Card = ({ icon, nickName, age }: UsersType) => (
    <CardWrapper icon={icon}>
      <Body>{nickName}, {age}</Body>
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
          <Card icon={user.icon} nickName={user.nickName} age={user.age} />
        </CSSTransition>
        <ButtonWrapper>
          <Button 
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ isLike: false })
              this.setState({ users: users.slice(1, users.length).concat(user)})
            }}
          >
            Nope
          </Button>
          <Button 
            style={{ marginLeft: 50 }} 
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ isLike: true })
              this.setState({ users: users.slice(1, users.length).concat(user)})
            }}
          >
            Like
          </Button>
        </ButtonWrapper>
      </Wrapper>
    )
  }
}

export default App