import React, { FormEventHandler } from 'react';
import { useHistory } from 'react-router-dom';
import * as Styled from './ServerSelector.styles';
import ROUTES from '../../constants/routes';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import useSelect from '../../hooks/useSelect';
import { CREWS } from '../../types';
import { Button, Modal, Select } from '..';
import { ReactComponent as ChangeIcon } from '../../assets/icons/exchange-alt-solid.svg';
import { ReactComponent as WarningIcon } from '../../assets/icons/exclamation-circle-solid.svg';
import BACKEND from '../../constants/backend';

const ServerSelector = () => {
  const history = useHistory();

  const { isModalOpen, openModal, closeModal } = useModal();

  const { server, isLogin, onSetServer, onLogout } = useAuth();
  const { value: selectedServer, onChange: onChangeSelectedServer } = useSelect(
    server || CREWS.DANYEE
  );

  const handleSubmitServer: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSetServer(selectedServer);
    onLogout();
    closeModal();

    if (isLogin) {
      history.replace(ROUTES.ROOT);
    }
  };

  return (
    <>
      <Styled.FABWrapper>
        <Button shape="round" onClick={openModal}>
          <ChangeIcon /> 서버 변경
        </Button>
      </Styled.FABWrapper>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Styled.Form onSubmit={handleSubmitServer}>
          <Modal.Title>서버 변경</Modal.Title>
          <Select labelText="서버 선택" value={selectedServer} onChange={onChangeSelectedServer}>
            {Object.entries(BACKEND).map(([crew, { name }]) => (
              <option key={crew} value={crew}>
                {name}
              </option>
            ))}
          </Select>
          <Styled.FormMessage>
            <WarningIcon />
            서버 변경 시, 로그인 된 상태라면 로그아웃됩니다
          </Styled.FormMessage>
          <Modal.Control>
            <Button type="button" variant="text">
              취소
            </Button>
            <Button>서버 변경</Button>
          </Modal.Control>
        </Styled.Form>
      </Modal>
    </>
  );
};

export default ServerSelector;
