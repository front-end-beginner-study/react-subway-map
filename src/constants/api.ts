export const API = {
  SIGN_IN: () => `${SERVER.URL}/login/token`,
  GET_STATIONS: () => `${SERVER.URL}/stations`,
  LINES: () => `${SERVER.URL}/lines`,
  SECTION: (id: number) => `${SERVER.URL}/lines/${id}/sections`,
  MAP: () => `${SERVER.URL}/map`,
};

export const ROUTE = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  STATION: '/station',
  LINE: '/line',
  SECTION: '/section',
  MAP: '/map',
};

export const BASE_URL = {
  ROOT: { name: '루트', URL: 'https://junroot.kro.kr' },
  CHUNSIK: { name: '춘식', URL: 'https://choonsik.n-e.kr' },
  SAKJEONG: { name: '삭정', URL: 'https://sakjung-subway.kro.kr' },
  SONNEOJAL: { name: '손너잘', URL: 'https://bperhaps.p-e.kr' },
};

export const SERVER = {
  URL: '',
};

export const API_RESULT = {
  SUCCESS: { success: true, data: {}, message: '' },
  FAILURE: { success: false, data: {}, message: '' },
};
