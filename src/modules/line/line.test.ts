import { call, select } from '@redux-saga/core/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { getLinesSaga, addLineSaga, deleteLineSaga, selectLines } from './lineSaga';
import lineReducer, { addLineAsync, deleteLineAsync, error, pending, setLines } from './lineReducer';
import { lineAPI } from '../../api/line';
import { addStationAsync } from '../station/stationReducer';

const lineList = [
  {
    id: 1,
    name: '인치선',
    color: '#FDDEAF',
  },
  {
    id: 2,
    name: '곤이선',
    color: '#492382',
  },
];

const errorMessage = '에러 메세지';

const newLine = {
  id: '3',
  name: '포코선',
  color: '#123456',
  upStationId: '1',
  downStationId: '2',
  distance: '100',
};

const newLineResult = {
  id: 3,
  name: '포코선',
  color: '#123456',
};

it('지하철 노선 목록을 성공적으로 불러온다.', async () => {
  return expectSaga(getLinesSaga)
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.getLines), { lines: lineList }]])
    .put(setLines({ lines: lineList }))
    .hasFinalState({ lines: lineList, error: '' })
    .run();
});

it('지하철 노선 목록을 불러오는데 실패한다.', async () => {
  return expectSaga(getLinesSaga)
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.getLines), { error: errorMessage }]])
    .put(error({ error: errorMessage }))
    .hasFinalState({ lines: [], error: errorMessage })
    .run();
});

it('지하철 노선 목록을 성공적으로 추가한다.', async () => {
  return expectSaga(addLineSaga, { type: addLineAsync, payload: { line: newLine } })
    .withReducer(lineReducer)
    .put(pending())
    .provide([
      [call(lineAPI.addLine, newLine), { line: newLineResult }],
      [select(selectLines), lineList],
    ])
    .put(setLines({ lines: [newLineResult, ...lineList] }))
    .hasFinalState({ lines: [newLineResult, ...lineList], error: '' })
    .run();
});

it('지하철 노선 목록을 추가하는데 실패한다.', async () => {
  return expectSaga(addLineSaga, { type: addLineAsync, payload: { line: newLine } })
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.addLine, newLine), { error: errorMessage }]])
    .put(error({ error: errorMessage }))
    .hasFinalState({ lines: [], error: errorMessage })
    .run();
});

it('지하철 노선 목록을 성공적으로 삭제한다.', async () => {
  return expectSaga(deleteLineSaga, { type: deleteLineAsync, payload: { id: Number(newLine.id) } })
    .withReducer(lineReducer)
    .put(pending())
    .provide([
      [call(lineAPI.deleteLine, Number(newLine.id)), {}],
      [select(selectLines), lineList.concat(newLineResult)],
    ])
    .put(setLines({ lines: lineList.filter(line => line.id !== Number(newLine.id)) }))
    .hasFinalState({ lines: lineList.filter(line => line.id !== Number(newLine.id)), error: '' })
    .run();
});

it('지하철 노선 목록을 삭제하는데 실패한다.', async () => {
  return expectSaga(deleteLineSaga, { type: deleteLineAsync, payload: { id: Number(newLine.id) } })
    .withReducer(lineReducer)
    .put(pending())
    .provide([[call(lineAPI.deleteLine, Number(newLine.id)), { error: errorMessage }]])
    .put(error({ error: errorMessage }))
    .hasFinalState({ lines: [], error: errorMessage })
    .run();
});
