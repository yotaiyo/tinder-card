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
  index: number
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
      isSwipe: false,
      index: 1
    }
  }

  render() {
    const { cssTransitionIn, users, isLike, isFadeout, isOnPress, cardHorizontalPosition, isSwipe, index } = this.state
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
      handleTouchMove: this.handleTouchMove,
      isSwipe,
      handleTouchEnd: this.handleTouchEnd,
      index,
      handleChangeIndex: this.handleChangeIndex,
      handleTransitionEnd: this.handleTransitionEnd
    }

    return <AppScreen {...passProps} />
  }

  private showNextUser = (user: UserType, users: UserType[]) => {
    window.setTimeout(() => {
      this.setState({ users: users.slice(1, users.length).concat(user), isFadeout: false, isOnPress: false})
    }, 500)
  }

  private onPressXButton = (cssTransitionIn: boolean, user: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn, isLike: false, isSwipe: false, isFadeout: true, isOnPress: true })
    this.showNextUser(user, users)
  }

  private onPressHeartButton = (cssTransitionIn: boolean, user: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn, isLike: true, isSwipe: false, isFadeout: true, isOnPress: true })
    this.showNextUser(user, users)
  }

  private handleTouchMove = () => {
    const element = document.getElementById('card')
    const rect =  element ? element.getBoundingClientRect() : null
    const left = rect ? rect.left : null
    this.setState({ isSwipe: true, cardHorizontalPosition: left })
  }

  private handleTouchEnd = (user: UserType, users: UserType[], cardHorizontalPosition: number | null, index: number) => {
    this.setState({ isSwipe: false  })
    this.setState({ index: index !== 1 ? 1 : 1 })
    if (cardHorizontalPosition > 50 || cardHorizontalPosition < -50 ) {
      this.setState({ cardHorizontalPosition: 5, users: users.slice(1, users.length).concat(user) })
    }
  }

  private handleChangeIndex = (index: number) => {
    this.setState({ index: index  })
  }

  private handleTransitionEnd = (index: number) => {
    this.setState({ index: index !== 1 ? 1 : 1 })
  }
}

export default AppScreenContainer