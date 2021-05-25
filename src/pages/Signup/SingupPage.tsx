import { useDispatch } from "react-redux";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useInput from "../../hooks/@common/useInput";
import { signup } from "../../modules/auth";
import { validateAge } from "../../validations/age";
import { validateEmail } from "../../validations/email";
import { validatePassword, validatePasswordConfirm } from "../../validations/password";

const SignupPage = () => {
  const [email, emailErrorMessage, onEmailChange, onEmailBlur] = useInput(validateEmail);
  const [age, ageErrorMessage, onAgeChange, onAgeBlur] = useInput(validateAge);
  const [password, passwordErrorMessage, onPasswordChange, onPasswordBlur] = useInput(validatePassword);
  const [passwordConfirm, passwordConfirmErrorMessage, onPasswordConfirmChange, onPasswordConfirmBlur] = useInput(
    (value: string) => {
      if (password && !passwordErrorMessage) {
        validatePasswordConfirm(password, value);
      }
    }
  );

  const dispatch = useDispatch();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(signup({ email, age: Number(age), password }));
  };

  return (
    <FlexCenter>
      <form onSubmit={onSubmit}>
        <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
          <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>📝 회원가입</h2>
          </FlexBetween>
          <Flex style={{ width: "100%", flexDirection: "column" }}>
            <Input
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "15px" }}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <Input
              value={age}
              errorMessage={ageErrorMessage}
              placeholder="나이"
              style={{ marginBottom: "15px" }}
              onChange={onAgeChange}
              onBlur={onAgeBlur}
            />
            <Input
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
            />
            <Input
              value={passwordConfirm}
              errorMessage={passwordConfirmErrorMessage}
              placeholder="비밀번호 확인"
              style={{ marginBottom: "25px" }}
              onChange={onPasswordConfirmChange}
              onBlur={onPasswordConfirmBlur}
            />
            <Button size="block">확인</Button>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default SignupPage;
