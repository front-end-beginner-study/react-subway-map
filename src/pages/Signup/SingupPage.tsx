import { useHistory } from "react-router-dom";
import TEST_ID from "../../@test/testId";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { INPUT_PLACEHOLDER } from "../../constants/placeholder";
import { PAGE_PATH } from "../../constants/route";
import useInput from "../../hooks/@common/useInput";
import useAuth from "../../hooks/useAuth";
import { validateAge } from "../../validations/age";
import { validateEmail } from "../../validations/email";
import { validatePassword, validatePasswordConfirm } from "../../validations/password";

const SignupPage = () => {
  const {
    inputValue: email,
    errorMessage: emailErrorMessage,
    setValueOnChange: onEmailChange,
    validateOnBlur: onEmailBlur,
  } = useInput(validateEmail);
  const {
    inputValue: age,
    errorMessage: ageErrorMessage,
    setValueOnChange: onAgeChange,
    validateOnBlur: onAgeBlur,
  } = useInput(validateAge);
  const {
    inputValue: password,
    errorMessage: passwordErrorMessage,
    setValueOnChange: onPasswordChange,
    validateOnBlur: onPasswordBlur,
  } = useInput(validatePassword);
  const {
    inputValue: passwordConfirm,
    errorMessage: passwordConfirmErrorMessage,
    setValueOnChange: onPasswordConfirmChange,
    validateOnBlur: onPasswordConfirmBlur,
  } = useInput((value: string) => {
    if (password && !passwordErrorMessage) {
      validatePasswordConfirm(password, value);
    }
  });

  const { signup, error } = useAuth();

  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (emailErrorMessage || ageErrorMessage || passwordErrorMessage || passwordConfirmErrorMessage) {
      alert("회원가입할 수 없습니다");
      return;
    }

    await signup({ email, age: Number(age), password });
    history.push(PAGE_PATH.HOME);
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
              placeholder={INPUT_PLACEHOLDER.EMAIL}
              style={{ marginBottom: "15px" }}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <Input
              type="number"
              value={age}
              errorMessage={ageErrorMessage}
              placeholder={INPUT_PLACEHOLDER.AGE}
              min="1"
              max="200"
              style={{ marginBottom: "15px" }}
              onChange={onAgeChange}
              onBlur={onAgeBlur}
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder={INPUT_PLACEHOLDER.PASSWORD}
              style={{ marginBottom: "15px" }}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
            />
            <Input
              type="password"
              value={passwordConfirm}
              errorMessage={passwordConfirmErrorMessage}
              placeholder={INPUT_PLACEHOLDER.PASSWORD_CONFIRM}
              style={{ marginBottom: "25px" }}
              onChange={onPasswordConfirmChange}
              onBlur={onPasswordConfirmBlur}
            />
            <Button data-testid={TEST_ID.SIGNUP_BUTTON} size="block">
              확인
            </Button>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default SignupPage;
