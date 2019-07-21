import * as React from 'react';
import style from 'styled-components';
import { UserType } from '../AppScreen';

const height = window.innerHeight;
const width = window.innerWidth;

const NickName = style.span`
  font-size: 35px;
  font-weight: bold;
`;

const Age = style.span`
  font-size: 25px;
  margin-left: 10px;
`;

const UserDetailWrapper = style.div`
  position: absolute;
  top: ${height - 50}px;
  padding-bottom: 70px;
  width: ${width}px;
`;

const NickNameAndAgeWrapper = style.div`
  margin-left: 10px;
`;

const DistanceWrapper = style.div`
  border-bottom: solid 1px #C0C0C0;
  padding-left: 10px;
  padding-bottom: 10px; 
`;

const LocationIcon = style.img`
  width: 20px;
  height: 20px;
`;

const Distance = style.span`
  margin-left: 5px;
`;

const Description = style.div`
  font-size: 16px;
  line-height: 1.8;
  white-space: pre-line;
  margin-left: 10px;
  margin-top: 10px;
`;

export const UserDetail = ({
  nickName,
  age,
  description,
  distance
}: Pick<UserType, 'nickName' | 'age' | 'description' | 'distance'>) => (
  <UserDetailWrapper>
    <NickNameAndAgeWrapper>
      <NickName>{nickName}</NickName>
      <Age>{age}</Age>
    </NickNameAndAgeWrapper>
    <DistanceWrapper>
      <LocationIcon src={require('../../../images/location.png')} />
      <Distance>{`${distance} km 先`}</Distance>
    </DistanceWrapper>
    <Description>{description}</Description>
  </UserDetailWrapper>
);
