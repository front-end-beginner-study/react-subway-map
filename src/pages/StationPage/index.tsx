import React, { useEffect, useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Input from 'components/shared/Input/Input';
import Button from 'components/shared/Button/Button';
import Loading from 'components/shared/Loading/Loading';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import saveIcon from 'assets/enter.png';
import useFetch from 'hooks/useFetch';
import Styled from './styles';
import {
  ROUTE,
  REGEX,
  END_POINT,
  RESPONSE_STATE,
  ALERT_MESSAGE,
  CONFIRM_MESSAGE,
  NOTIFICATION,
  API_METHOD,
  INPUT,
} from '../../constants';
import useNotify from 'hooks/useNotify';

const StationPage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [stations, setStations] = useState<Station[]>([]);
  const [newStationName, setNewStationName] = useState('');
  const [editingStationId, setEditingStationId] = useState<number>(0);
  const [editingStationName, setEditingStationName] = useState<string>('');

  const { fetchData: getStationsAsync, loading: getStationsLoading } = useFetch(API_METHOD.GET);
  const { fetchData: addStationAsync, loading: addStationLoading } = useFetch(API_METHOD.POST);
  const { fetchData: deleteStationAsync, loading: deleteStationLoading } = useFetch(
    API_METHOD.DELETE,
  );
  const { fetchData: editStationAsync, loading: editStationLoading } = useFetch(API_METHOD.PUT);
  const { setNotification: setStationNotification, Notification: StationNotification } =
    useNotify();

  const inputRef = useRef<HTMLInputElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const isValidStationName = (stationName: string) =>
    REGEX.ONLY_KOREAN_AND_NUMBER.test(stationName);

  const getStations = async () => {
    const res = await getStationsAsync(END_POINT.STATIONS);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      setStations(res.data.reverse());
    }
  };

  const addStation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName(newStationName)) {
      setStationNotification({
        message: NOTIFICATION.STATION_NAME,
        isValid: false,
        isVisible: true,
      });

      return;
    }

    setStationNotification({ message: '', isValid: false, isVisible: false });

    const res = await addStationAsync(END_POINT.STATIONS, {
      name: newStationName,
    });

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      setNewStationName('');
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_ADD_STAION);

      await getStations();
    }
  };

  const editStation = (station: { id: number; name: string }) => {
    setEditingStationId(station.id);
    setEditingStationName(station.name);
  };

  const saveEditForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidStationName(editingStationName)) {
      setStationNotification({
        message: NOTIFICATION.STATION_NAME,
        isValid: false,
        isVisible: true,
      });

      return;
    }
    setStationNotification({ message: '', isValid: false, isVisible: false });

    const res = await editStationAsync(`${END_POINT.STATIONS}/${editingStationId}`, {
      name: editingStationName,
    });

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      await getStations();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_EDIT_STATION);
    }

    setEditingStationId(0);
    setEditingStationName('');
  };

  const deleteStation = async (id: Station['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await deleteStationAsync(`${END_POINT.STATIONS}/${id}`);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      await getStations();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_DELETE_STAION);
    }
  };

  const isLoading =
    getStationsLoading || addStationLoading || deleteStationLoading || editStationLoading;

  // TOOD: 첫 번째 클릭에는 focus 실패
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  useEffect(() => {
    const fetchStations = async () => {
      await getStations();
    };

    fetchStations();
  }, []);

  return (
    <CardLayout title={'지하철 역 관리'}>
      <Loading isLoading={isLoading} />
      <form onSubmit={addStation}>
        <Styled.InputContainer>
          <Styled.InputWrapper>
            <Input
              type="text"
              labelText="지하철 역 이름을 입력해주세요."
              value={newStationName}
              onChange={(event) => setNewStationName(event.target.value)}
              minLength={INPUT.STATION_NAME.MIN_LENGTH}
              maxLength={INPUT.STATION_NAME.MAX_LENGTH}
            />
            <StationNotification />
          </Styled.InputWrapper>
          <Button styleType={ButtonType.YELLOW}>추가</Button>
        </Styled.InputContainer>
      </form>

      <Styled.StationsContainer data-testid="station-list">
        {stations?.map((station) => (
          <Styled.StationItem key={station.id} data-testid="station-item">
            {station.id === editingStationId ? (
              <Styled.EditingStationForm onSubmit={saveEditForm}>
                <Styled.EditingStationInput
                  ref={inputRef}
                  value={editingStationName}
                  onChange={(e) => setEditingStationName(e.target.value)}
                  minLength={INPUT.STATION_NAME.MIN_LENGTH}
                  maxLength={INPUT.STATION_NAME.MAX_LENGTH}
                ></Styled.EditingStationInput>
                <Button styleType={ButtonType.TRANSPARENT} type="submit">
                  <Styled.Icon src={saveIcon} alt="save" />
                </Button>
              </Styled.EditingStationForm>
            ) : (
              <>
                {station.name}
                <Styled.ButtonsContainer>
                  <Button styleType={ButtonType.TRANSPARENT} onClick={() => editStation(station)}>
                    <Styled.Icon src={editIcon} alt="edit" />
                  </Button>
                  <Button
                    styleType={ButtonType.TRANSPARENT}
                    onClick={() => deleteStation(station.id)}
                  >
                    <Styled.Icon src={deleteIcon} alt="delete" />
                  </Button>
                </Styled.ButtonsContainer>
              </>
            )}
          </Styled.StationItem>
        ))}
      </Styled.StationsContainer>
    </CardLayout>
  );
};

export default StationPage;
