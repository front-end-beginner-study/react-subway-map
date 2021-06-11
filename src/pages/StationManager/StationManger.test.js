import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StationManager from '.';
import { BUTTON_ID, ERROR, INPUT_TEXT } from '../../constants';
import { configureStore } from '@reduxjs/toolkit';
import { TEST } from '../../constants/test';

describe('<StationManager />', () => {
  const mockStation = {
    id: TEST.MOCK_DATA.ID,
    name: TEST.MOCK_DATA.NAME,
  };

  const mockStore = configureStore({
    reducer: {
      subway: () => ({ stations: [mockStation] }),
    },
  });

  const setup = () => {
    const utils = render(
      <Provider store={mockStore}>
        <StationManager />
      </Provider>
    );
    const { getByLabelText, getByPlaceholderText } = utils;
    const addButton = getByLabelText(BUTTON_ID.STATION_ADD);
    const input = getByPlaceholderText(INPUT_TEXT.STATION_NAME.PLACE_HOLDER);

    return {
      ...utils,
      addButton,
      input,
    };
  };

  it('역 이름에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input, addButton } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.STATION_NAME.REQUIRED },
      { value: 'test', message: ERROR.STATION_NAME.INVALID },
      { value: TEST.MOCK_DATA.NAME, message: ERROR.STATION_NAME.DUPLICATE },
    ];

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input, { target: { value } });
      fireEvent.click(addButton);
      await waitFor(() => getByText(message));
    }
  });
});
