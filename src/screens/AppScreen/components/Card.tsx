import * as React from 'react';
import style from 'styled-components';
import { LikeOrNopeSquare } from './LikeOrNopeSquare';
import { UserType } from '../AppScreen';

const height = window.innerHeight;
const width = window.innerWidth;

const CardWrapper = style.div`
  height: ${height - 80}px;
  width: ${width - 10}px;
  background-size: cover;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 12px;
`;

const UserInfo = style.div`
  color: #fff;
  padding-top: ${height - 210}px;
  width: ${width - 50}px;
  margin-left: 20px;
`;

const DescriptionAndInfoButtonWrapper = style.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TwoLinesDescription = style.div`
  overflow: hidden;
  height: 3.6em;
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
`;

const InfoButton = style.img`
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
`;

const ArrowButton = style.img`
  width: 15px;
  height: 15px;
  background-color: red;
  padding: 5px;
  border-radius: 30px;
  position: absolute;
  top: ${height - 95}px;
  left: ${2 * width - 46}px;
`;

const NickName = style.span`
  font-size: 35px;
  font-weight: bold;
`;

const Age = style.span`
  font-size: 25px;
  margin-left: 10px;
`;

interface FrontCardType
  extends Pick<UserType, 'icon' | 'nickName' | 'age' | 'description'> {
  cssTransitionClassNames: 'right' | 'left' | 'doNothing';
  isFadeout: boolean;
  cardHorizontalPosition: number | null;
  isSwipe: boolean;
  showUserDetail: boolean;
  onClickInfoButton: () => void;
  onClickArrowButton: () => void;
}

export const FrontCard = ({
  icon,
  nickName,
  age,
  description,
  cssTransitionClassNames,
  isFadeout,
  cardHorizontalPosition,
  isSwipe,
  showUserDetail,
  onClickInfoButton,
  onClickArrowButton
}: FrontCardType) => {
  return (
    <CardWrapper
      style={{
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5)), url(${icon})`
      }}
      id="card"
    >
      <LikeOrNopeSquare
        isFadeout={isFadeout}
        cssTransitionClassNames={cssTransitionClassNames}
        cardHorizontalPosition={cardHorizontalPosition}
        isSwipe={isSwipe}
      />
      {!showUserDetail && (
        <UserInfo>
          <NickName>{nickName}</NickName>
          <Age>{age}</Age>
          <DescriptionAndInfoButtonWrapper>
            <TwoLinesDescription>{description}</TwoLinesDescription>
            <InfoButton
              src={require('../../../images/info.png')}
              onClick={onClickInfoButton}
            />
          </DescriptionAndInfoButtonWrapper>
        </UserInfo>
      )}
      {showUserDetail && (
        <ArrowButton
          src={require('../../../images/arrow.png')}
          onClick={onClickArrowButton}
        />
      )}
    </CardWrapper>
  );
};

export const BackCard = ({
  icon,
  nickName,
  age,
  description
}: Pick<UserType, 'icon' | 'nickName' | 'age' | 'description'>) => (
  <CardWrapper
    style={{
      background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5)), url(${icon})`,
      position: 'absolute',
      left: 0,
      right: 0,
      margin: 'auto'
    }}
  >
    <UserInfo>
      <NickName>{nickName}</NickName>
      <Age>{age}</Age>
      <DescriptionAndInfoButtonWrapper>
        <TwoLinesDescription>{description}</TwoLinesDescription>
        <InfoButton src={require('../../../images/info.png')} />
      </DescriptionAndInfoButtonWrapper>
    </UserInfo>
  </CardWrapper>
);
