import * as React from 'react'
import { users } from '../../data/users'
import './fadeout.css'
import { AppScreen, UserType } from './AppScreen'
import { animateScroll as scroll } from 'react-scroll'

export interface AppStateType {
  cssTransitionIn: boolean
  users: UserType[]
  // doNothingはチラつき対策で必要
  cssTransitionClassNames: 'right' | 'left' | 'doNothing'
  isFadeout: boolean
  // 連打対策
  isOnClikeCircleButton: boolean
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
      cssTransitionClassNames: 'doNothing',
      isFadeout: false,
      isOnClikeCircleButton: false,
      cardHorizontalPosition: null,
      isSwipe: false,
      index: 1,
      showUserDetail: false
    }
  }

  render() {
    const { cssTransitionIn, users, cssTransitionClassNames, isFadeout, isOnClikeCircleButton, cardHorizontalPosition, isSwipe, index, showUserDetail } = this.state
    const passProps = {
      cssTransitionIn,
      users,
      cssTransitionClassNames,
      isFadeout,
      isOnClikeCircleButton,
      cardHorizontalPosition,
      frontUser: users[0],
      onClickCircleButton: this.onClickCircleButton,
      handleTouchMove: this.handleTouchMove,
      isSwipe,
      handleTouchEnd: this.handleTouchEnd,
      index,
      handleChangeIndex: this.handleChangeIndex,
      handleTransitionEnd: this.handleTransitionEnd,
      backUser: users[1],
      showUserDetail,
      onClickInfoButton: this.onClickInfoButton,
      onClickArrowButton: this.onClickArrowButton
    }
    return <AppScreen {...passProps} />
  }

  private onClickCircleButton = (cssTransitionIn: boolean, frontUser: UserType, users: UserType[], isLike: boolean) => {
    this.setState({ cssTransitionIn: !cssTransitionIn, cssTransitionClassNames: isLike ? 'right' : 'left', isSwipe: false, isFadeout: true, isOnClikeCircleButton: true })
    window.setTimeout(() => {
      this.setState({ users: users.slice(1, users.length).concat(frontUser), isFadeout: false, isOnClikeCircleButton: false, showUserDetail: false, cssTransitionIn: !!cssTransitionIn, cssTransitionClassNames: 'doNothing' })
    }, 500)
  }

  private handleTouchMove = () => {
    const element = document.getElementById('card')
    const rect =  element ? element.getBoundingClientRect() : null
    const left = rect ? rect.left : null
    this.setState({ isSwipe: true, cardHorizontalPosition: left })
  }

  private handleTouchEnd = (cssTransitionIn: boolean, cardHorizontalPosition: number) => {
    if (cardHorizontalPosition > 50 ) {
      this.setState({ cssTransitionIn: !cssTransitionIn, cssTransitionClassNames: 'right', isSwipe: false, isFadeout: true })
    } else if (cardHorizontalPosition < -50) {
      this.setState({ cssTransitionIn: !cssTransitionIn, cssTransitionClassNames: 'left', isSwipe: false, isFadeout: true })
    }
  }

  private handleChangeIndex = (index: number) => {
    this.setState({ index: index  })
  }

  private handleTransitionEnd = (cssTransitionIn: boolean, frontUser: UserType, users: UserType[], cardHorizontalPosition: number | null, index: number) => {
    this.setState({ isFadeout: false })
    // もしカードのindexが1からズレた場合、元に戻す。
    this.setState({ index: index !== 1 ? 1 : 1 })
    if (cardHorizontalPosition > 50 || cardHorizontalPosition < -50 ) {
      this.setState({ cardHorizontalPosition: 5, users: users.slice(1, users.length).concat(frontUser), cssTransitionIn: !cssTransitionIn, cssTransitionClassNames: 'doNothing' })
    }
  }

  private onClickInfoButton = () => {
    this.setState({ showUserDetail: true })
    scroll.scrollTo(50, { duration: 300 })
  }

  private onClickArrowButton = () => {
    this.setState({ showUserDetail: false })
  }
}

export default AppScreenContainer