import {
  NavigationBarContainer,
  Logo,
  LogoImg,
  StyledNavLink,
  NaviLinkContainer,
} from './NavigationBar.styles';

const NavigationBar = () => {
  return (
    <NavigationBarContainer>
      <Logo>
        <LogoImg src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="logo" />
      </Logo>
      <NaviLinkContainer>
        <StyledNavLink to="/">역 관리</StyledNavLink>
        <StyledNavLink to="/">노선 관리</StyledNavLink>
        <StyledNavLink to="/">구간 관리</StyledNavLink>
        <StyledNavLink to="/">경로 검색</StyledNavLink>
        <StyledNavLink to="/">로그인</StyledNavLink>
      </NaviLinkContainer>
    </NavigationBarContainer>
  );
};

export default NavigationBar;
