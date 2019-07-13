import * as React from 'react'
import { users } from './users'
import style from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

const Wrapper = style.div`
  margin-top: 100px;
  font-family: 'Vollkorn', serif;
  padding: 20px;
`

const CardWrapper = style.div`
  text-align: center;
  box-shadow: 0px 0px 6px 0.05px rgba(0,0,0,0.2);
  padding: 20px;
`

const Icon = style.img`
  width: 200px;
`

const Body = style.div`
  margin-top: 10px;
  font-size: 15px;
`

const ButtonWrapper = style.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`

const Button = style.div`
  background-color: #003399;
  color: white;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px; 
`

const Card = ({ icon, nickName, age }) => (
    <CardWrapper>
      <Icon src={icon} />
      <Body>{nickName}, {age}</Body>
    </CardWrapper>
)

interface AppPropsType {}

interface AppStateType {
  showCard: boolean
  users: { icon: string, nickName: string, age: number }[]
}

class App extends React.Component<AppPropsType, AppStateType> {
  constructor(props: AppPropsType) {
    super(props)
    this.state={
      showCard: true,
      users: users 
    }
  }

  render() {
    const { showCard, users } = this.state
    const user = users[0]

    return (
      <Wrapper>
        <CSSTransition
          in={showCard}
          classNames='alert'
          timeout={300}
        >
            <Card icon={user.icon} nickName={user.nickName} age={user.age} />
        </CSSTransition>

        <ButtonWrapper>
          <Button 
            onClick={() => {
              this.setState({ showCard: !showCard })
              this.setState({ users: users.slice(1, users.length).concat(users[0])})
            }}
          >
            Nope
          </Button>
          <Button 
            style={{ marginLeft: 50 }} 
            onClick={() => {
              this.setState({ showCard: !showCard })
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