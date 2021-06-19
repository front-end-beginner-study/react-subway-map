import React from 'react';
import { fireEvent } from '@testing-library/react';
import Login from './Login';
import { customRender } from '../../test-utils';
import { act } from 'react-dom/test-utils';
import { requestLogin } from '../../API/member';
import { LABEL_TEXT } from '../../constants/a11y';

jest.mock('../../API/member');

describe('로그인 페이지 테스트', () => {
  it('로그인 요청', () => {
    const screen = customRender(<Login />);

    const $loginForm = screen.getByRole('form');

    act(() => {
      fireEvent.submit($loginForm, {
        target: {
          email: 'test@test.com',
          password: '123456',
        },
      });
    });

    expect(requestLogin).toBeCalled();
  });

  it('회원가입 페이지로 이동', async () => {
    const screen = customRender(<Login />);

    const $linkToSignUp = screen.getByRole('link', {
      name: LABEL_TEXT.ARE_YOU_NOT_MEMBER,
    });

    act(() => {
      fireEvent.click($linkToSignUp);
    });

    expect(window.location.pathname).toEqual('/signup');
  });
});
