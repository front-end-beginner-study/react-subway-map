import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { RootState } from '..';
import { lineAPI } from '../../api/line';
import { AddLine, Line } from '../../interfaces';
import { error, getLinesAsync, addLineAsync, pending, setLines, deleteLineAsync } from './lineReducer';

interface AddLineAction {
  type: typeof addLineAsync;
  payload: {
    line: AddLine;
  };
}

interface DeleteLineAction {
  type: typeof deleteLineAsync;
  payload: {
    id: number;
  };
}
interface GetLineResult {
  error: string;
  lines: Line[];
}

interface AddLineResult {
  error: string;
  line: Line;
}

interface deleteLineResult {
  error: string;
}

export const selectLines = (state: RootState) => state.line.lines;

export function* getLinesSaga() {
  yield put(pending());
  const result: GetLineResult = yield call(lineAPI.getLines);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  yield put(setLines({ lines: result.lines }));
}

export function* addLineSaga(action: AddLineAction) {
  yield put(pending());
  const result: AddLineResult = yield call(lineAPI.addLine, action.payload.line);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  const lines: Line[] = yield select(selectLines);

  yield put(setLines({ lines: [...lines, result.line] }));
}

export function* deleteLineSaga(action: DeleteLineAction) {
  yield put(pending());
  const result: deleteLineResult = yield call(lineAPI.deleteLine, action.payload.id);

  if (result.error) {
    yield put(error({ error: result.error }));
    return;
  }
  const lines: Line[] = yield select(selectLines);

  yield put(setLines({ lines: lines.filter(line => line.id !== Number(action.payload.id)) }));
}

export function* lineSaga() {
  yield takeLatest(getLinesAsync.type, getLinesSaga);
  yield takeLatest(addLineAsync.type, addLineSaga);
  yield takeLatest(deleteLineAsync.type, deleteLineSaga);
}
