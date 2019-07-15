import * as React from 'react'
import { users } from '../../../public/data/users'
import './fadeout.css'
import { AppScreen, UserType } from './AppScreen'

export interface AppStateType {
  cssTransitionIn: boolean
  users: UserType[]
  isLike: boolean
  isFadeout: boolean
  isOnPress: boolean
  cardHorizontalPosition: number | null
}

class AppScreenContainer extends React.Component<{}, AppStateType> {
  constructor(props: {}) {
    super(props)
    this.state={
      cssTransitionIn: true,
      users: users,
      isLike: true,
      isFadeout: false,
      isOnPress: false,
      cardHorizontalPosition: null
    }
  }

  render() {
    const { cssTransitionIn, users, isLike, isFadeout, isOnPress, cardHorizontalPosition } = this.state
    console.log(cardHorizontalPosition)
    const user = users[0]
    const passProps = {
      cssTransitionIn,
      users,
      isLike,
      isFadeout,
      isOnPress,
      cardHorizontalPosition,
      user,
      onPressXButton: this.onPressXButton,
      onPressHeartButton: this.onPressHeartButton,
      onTouchMoveCard: this.onTouchMoveCard
    }

    return <AppScreen {...passProps} />
  }

  private showNextUser = (user: UserType, users: UserType[]) => {
    window.setTimeout(() => {
      this.setState({ users: users.slice(1, users.length).concat(user)})
      this.setState({ isFadeout: false})
      this.setState({ isOnPress: false })
    }, 500)
  }

  private onPressXButton = (cssTransitionIn: boolean, user: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn })
    this.setState({ isLike: false })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }

  private onPressHeartButton = (cssTransitionIn: boolean, user: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn })
    this.setState({ isLike: true })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }

  private onTouchMoveCard = () => {
    const element = document.getElementById('card')
    const rect =  element ? element.getBoundingClientRect() : null
    const left = rect ? rect.left : null
    this.setState({ cardHorizontalPosition: left })
  }
}

export default AppScreenContainer