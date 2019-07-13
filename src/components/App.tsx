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
  text-align: center;
  background-color: #FFF;
`

const Icon = style.img`
  width: ${width - 40}px;
  height: ${height - 120}px;
  border-radius: 10px;
`

const Body = style.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  top: ${height - 180}px;
  left: 25px;
  position: absolute;
  background-color: rgba(192, 192, 192);
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

const Card = ({ icon, nickName, age, }) => (
    <CardWrapper>
      <Icon src={icon} />
      <Body>{nickName}, {age}</Body>
    </CardWrapper>
)

interface AppPropsType {}

interface AppStateType {
  showCard: boolean
  users: { icon: string, nickName: string, age: number }[]
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
              this.setState({ users: users.slice(1, users.length).concat(users[0])})
            }}
          >
            Nope
          </Button>
          <Button 
            style={{ marginLeft: 50 }} 
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ isLike: true })
              this.setState({ users: users.slice(1, users.length).concat(users[0])})
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