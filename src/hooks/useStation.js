import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MESSAGE_TYPE, SHOWING_MESSAGE_TIME, STATION } from '../constants';
import { addStation, clearStationState, fetchStations, removeStation } from '../redux/stationSlice';
import useAuthorization from './commons/useAuthorization';

const useStation = (ref) => {
  const dispatch = useDispatch();

  const { stations } = useSelector((store) => store.station);

  const { enqueueSnackbar } = useSnackbar();
  useAuthorization();

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await dispatch(fetchStations());
        unwrapResult(response);
      } catch (error) {
        console.error(error);
      }
    };

    getStations();
  }, [dispatch]);

  const handleAddStation = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(addStation({ name: e.target.name.value }));
      unwrapResult(response);
      ref.current.value = '';

      enqueueSnackbar(STATION.ADD_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    } catch (error) {
      enqueueSnackbar(STATION.ADD_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearStationState());
  };

  const handleDeleteStation = async (stationId) => {
    try {
      const response = await dispatch(removeStation({ id: stationId }));
      unwrapResult(response);

      enqueueSnackbar(STATION.DELETE_SUCCEED, { autoHideDuration: SHOWING_MESSAGE_TIME });
    } catch (error) {
      enqueueSnackbar(STATION.DELETE_FAIL, { variant: MESSAGE_TYPE.ERROR, autoHideDuration: SHOWING_MESSAGE_TIME });
    }

    dispatch(clearStationState());
  };

  return { stations, handleAddStation, handleDeleteStation };
};

export default useStation;
