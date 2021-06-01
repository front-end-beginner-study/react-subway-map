import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY } from '../constants/API';
import { REGEX } from '../constants/validate';
import { requestLines } from '../service/line';
import {
  requestAddStation,
  requestDeleteStation,
  requestStations,
} from '../service/station';
import { Line, StationForm, StationId } from '../types';
import useLogin from './useLogin';

const useStation = () => {
  const [form, setForm] = useState<StationForm>({ name: '' });
  const { name } = form;
  const { accessToken } = useLogin();
  const queryClient = useQueryClient();
  const lines = useQuery('requestLines', () => requestLines(accessToken));

  const addMutation = useMutation(() => requestAddStation(form, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY.REQUEST_STATIONS);
    },
    onError: () => {
      alert('역을 추가하지 못했습니다!');
    },
  });

  const deleteMutation = useMutation(
    (stationId: StationId) => requestDeleteStation(stationId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY.REQUEST_STATIONS);
      },
      onError: () => {
        alert('역을 삭제하지 못했습니다!');
      },
    }
  );

  const stations = useQuery(QUERY.REQUEST_STATIONS, () =>
    requestStations(accessToken)
  );

  const isValidName = REGEX.STATION_NAME.test(name);

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const addStation = () => {
    addMutation.mutate();
  };

  const isStationInLine = (lines: Line[], stationId: number) =>
    lines.some((line: Line) =>
      line.stations.some((station) => station.id === stationId)
    );

  const deleteStation = (stationId: StationId) => {
    if (isStationInLine(lines.data as Line[], stationId)) {
      alert('노선에 등록된 역은 삭제하실 수 없습니다.');
      return;
    }

    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    deleteMutation.mutate(stationId);
  };

  const isAddStationError = addMutation.error;

  const isAddStationSuccess = addMutation.isSuccess;

  return {
    stations,
    name,
    setName,
    addStation,
    isAddStationError,
    isAddStationSuccess,
    deleteStation,
    isValidName,
  };
};

export default useStation;
