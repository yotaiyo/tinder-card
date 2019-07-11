import * as React from 'react'
import { users } from './users'
import style from 'styled-components'

const user = users[0]

const Wrapper = style.div`
  margin-top: 100px;
  font-family: 'Vollkorn', serif;
  padding: 20px;
`

const Card = style.div`
  text-align:center;
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

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Wrapper>
        <Card>
          <Icon src={user.icon} />
          <Body>{user.nickName}, {user.age}</Body>
        </Card>
      </Wrapper>
    )
  }
}

export default App