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
  isSwipe: boolean
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
      cardHorizontalPosition: null,
      isSwipe: false
    }
  }

  render() {
    const { cssTransitionIn, users, isLike, isFadeout, isOnPress, cardHorizontalPosition, isSwipe } = this.state
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
      handeTouchMove: this.handeTouchMove,
      isSwipe,
      handeTouchEnd: this.handeTouchEnd
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
    this.setState({ isSwipe: false })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }

  private onPressHeartButton = (cssTransitionIn: boolean, user: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn })
    this.setState({ isLike: true })
    this.setState({ isSwipe: false })
    this.setState({ isFadeout: true })
    this.setState({ isOnPress: true })
    this.showNextUser(user, users)
  }

  private handeTouchMove = () => {
    const element = document.getElementById('card')
    const rect =  element ? element.getBoundingClientRect() : null
    const left = rect ? rect.left : null
    this.setState({ isSwipe: true })
    this.setState({ cardHorizontalPosition: left })
  }

  private handeTouchEnd = (user: UserType, users: UserType[], cardHorizontalPosition: number | null) => {
    this.setState({ isSwipe: false })
    if (cardHorizontalPosition > 50 || cardHorizontalPosition < -50 ) {
      this.setState({ cardHorizontalPosition: 5 })     
      this.setState({ users: users.slice(1, users.length).concat(user) })     
    }
  }
}

export default AppScreenContainer