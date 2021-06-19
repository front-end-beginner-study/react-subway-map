import React, { VFC } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PAGE_INFO } from '../../../constants/appInfo';
import { logout } from '../../../redux/slice/loginSlice';
import { clearRootReducer, RootState, useAppDispatch } from '../../../redux/store';
import { PageInfo } from '../../../types';
import StyledLink from '../StyledLink/StyledLink';
import { NavButton, NavList } from './Navigation.styles';

interface Props {
  navigatingPageInfoList: PageInfo[];
}

const Navigation: VFC<Props> = ({ navigatingPageInfoList }) => {
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    clearRootReducer();
    history.push(PAGE_INFO.HOME.path);
  };

  return (
    <nav>
      <NavList>
        {navigatingPageInfoList.map((navInfo, index) => (
          <li key={index}>
            <StyledLink to={navInfo.path}>{navInfo.text}</StyledLink>
          </li>
        ))}
        <li>
          {isLogin ? (
            <NavButton type="button" onClick={onLogout} isColored={false}>
              로그아웃
            </NavButton>
          ) : (
            <StyledLink to={PAGE_INFO.LOGIN.path}>{PAGE_INFO.LOGIN.text}</StyledLink>
          )}
        </li>
      </NavList>
    </nav>
  );
};

export default Navigation;
