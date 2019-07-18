import * as React from 'react'
import { users } from '../../../public/data/users'
import './fadeout.css'
import { AppScreen, UserType } from './AppScreen'

export interface AppStateType {
  cssTransitionIn: boolean
  users: UserType[]
  isLike: boolean
  isFadeout: boolean
  isonClick: boolean
  cardHorizontalPosition: number | null
  isSwipe: boolean
  index: number
  showUserDetail: boolean
}

class AppScreenContainer extends React.Component<{}, AppStateType> {
  constructor(props: {}) {
    super(props)
    this.state={
      cssTransitionIn: true,
      users: users,
      isLike: true,
      isFadeout: false,
      isonClick: false,
      cardHorizontalPosition: null,
      isSwipe: false,
      index: 1,
      showUserDetail: false
    }
  }

  render() {
    const { cssTransitionIn, users, isLike, isFadeout, isonClick, cardHorizontalPosition, isSwipe, index, showUserDetail } = this.state
    const frontUser = users[0]
    const backUser = users[1]
    const passProps = {
      cssTransitionIn,
      users,
      isLike,
      isFadeout,
      isonClick,
      cardHorizontalPosition,
      frontUser,
      onClickXButton: this.onClickXButton,
      onClickHeartButton: this.onClickHeartButton,
      handleTouchMove: this.handleTouchMove,
      isSwipe,
      handleTouchEnd: this.handleTouchEnd,
      index,
      handleChangeIndex: this.handleChangeIndex,
      handleTransitionEnd: this.handleTransitionEnd,
      backUser,
      showUserDetail,
      onClickInfoButton: this.onClickInfoButton
    }

    return <AppScreen {...passProps} />
  }

  private showNextUser = (frontUser: UserType, users: UserType[]) => {
    window.setTimeout(() => {
      this.setState({ users: users.slice(1, users.length).concat(frontUser), isFadeout: false, isonClick: false})
    }, 500)
  }

  private onClickXButton = (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn, isLike: false, isSwipe: false, isFadeout: true, isonClick: true })
    this.showNextUser(frontUser, users)
  }

  private onClickHeartButton = (cssTransitionIn: boolean, frontUser: UserType, users: UserType[]) => {
    this.setState({ cssTransitionIn: !cssTransitionIn, isLike: true, isSwipe: false, isFadeout: true, isonClick: true })
    this.showNextUser(frontUser, users)
  }

  private handleTouchMove = () => {
    const element = document.getElementById('card')
    const rect =  element ? element.getBoundingClientRect() : null
    const left = rect ? rect.left : null
    this.setState({ isSwipe: true, cardHorizontalPosition: left })
  }

  private handleTouchEnd = (frontUser: UserType, users: UserType[], cardHorizontalPosition: number | null, index: number) => {
    this.setState({ isSwipe: false  })
    this.setState({ index: index !== 1 ? 1 : 1 })
    if (cardHorizontalPosition > 50 || cardHorizontalPosition < -50 ) {
      this.setState({ cardHorizontalPosition: 5, users: users.slice(1, users.length).concat(frontUser) })
    }
  }

  private handleChangeIndex = (index: number) => {
    this.setState({ index: index  })
  }

  private handleTransitionEnd = (index: number) => {
    this.setState({ index: index !== 1 ? 1 : 1 })
  }

  private onClickInfoButton = () => {
    this.setState({ showUserDetail: true })
  }
}

export default AppScreenContainer