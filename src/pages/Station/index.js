import React, { useState, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';

import { useStation } from '../../hooks';
import { ButtonSquare, IconSubway, Input, Section } from '../../components';
import { StationListItem } from './StationListItem';
import { Form, List } from './style';
import { STATION } from '../../constants';

export const StationPage = () => {
  const { stations, status, requestAddStation, requestDeleteStation, clearStatus } = useStation();
  const [inputStatus, setInputStatus] = useState({ message: '', isValid: false });
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef();

  const handleStationNameInputChange = (e) => {
    setInputStatus(getInputStatus(e.target.value));
  };

  const handleStationAdd = (e) => {
    e.preventDefault();
    requestAddStation(e.target.name.value);
  };

  const handleStationDelete = (_, stationId) => {
    requestDeleteStation(stationId);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status.message) {
      enqueueSnackbar(status.message);
    }
    if (status.isAddSuccess) {
      ref.current.focus();
      ref.current.value = '';
    }
    clearStatus();
  }, [status]);

  return (
    <Section heading="지하철 역 관리">
      <Form onSubmit={handleStationAdd}>
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Input
          ref={ref}
          type="text"
          name="name"
          icon={<IconSubway />}
          placeholder="지하철 역 이름을 입력해주세요."
          onChange={handleStationNameInputChange}
          hasMessage
          message={inputStatus.message}
          autoFocus
        />
        <ButtonSquare disabled={!inputStatus.isValid} data-testid="add-button">
          추가
        </ButtonSquare>
      </Form>
      <List>
        {stations?.map((station) => (
          <StationListItem key={station.id} station={station} onClick={handleStationDelete} />
        ))}
      </List>
    </Section>
  );
};

function getInputStatus(name) {
  if (name.length > STATION.NAME_LENGTH_MAX) {
    return {
      message: STATION.NAME_IS_TOO_LONG,
      isValid: false,
    };
  } else if (name.length < STATION.NAME_LENGTH_MIN) {
    return {
      message: STATION.NAME_IS_TOO_SHORT,
      isValid: false,
    };
  } else if (name.includes(' ')) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_BLANK,
      isValid: false,
    };
  } else if (name.match(/[a-zA-Z]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_ENGLISH,
      isValid: false,
    };
  } else if (name.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return {
      message: STATION.NAME_CANNOT_INCLUDE_SPECIAL_CHARACTER,
      isValid: false,
    };
  }
  return {
    message: '',
    isValid: true,
  };
}
