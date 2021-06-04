/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import BACKEND from '../constants/backend';
import MESSAGE from '../constants/message';
import { CREWS } from '../types';
import { LINE_LIST, STATION_LIST, USER_LIST } from './mockData';

export const handlers = [
  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/login`, (req, res, ctx) => {
    const { email, password } = req.body;

    const currentUser = USER_LIST.find((user) => user.email === email);

    if (!currentUser) {
      return res(ctx.status(400), ctx.json({ status: 400, message: MESSAGE.ERROR.LOGIN_FAILURE }));
    }

    if (currentUser.password !== password) {
      return res(ctx.status(400), ctx.json({ status: 400, message: MESSAGE.ERROR.LOGIN_FAILURE }));
    }

    return res(ctx.status(200), ctx.json({ accessToken: '1234' }));
  }),
  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/members`, (req, res, ctx) => {
    const { email, password, age } = req.body;

    if (!email || !password || !age) {
      return res(ctx.status(400), ctx.json({ status: 400, message: MESSAGE.ERROR.SIGNUP_FAILURE }));
    }

    return res(ctx.status(200), ctx.json({ accessToken: '1234' }));
  }),
  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/members/exists`, (req, res, ctx) => {
    const { email } = req.body;

    if (!email) {
      return res(ctx.status(400));
    }

    const existUser = USER_LIST.find((user) => user.email === email);

    if (existUser) {
      return res(ctx.status(400));
    }

    return res(ctx.status(200));
  }),

  rest.get(`${BACKEND[CREWS.DANYEE].baseUrl}/stations`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(STATION_LIST));
  }),
  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/stations`, (req, res, ctx) => {
    if (req.body.name.length < 2 || req.body.name.length > 20) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH })
      );
    }

    const newStation = {
      id: 14,
      ...req.body,
    };

    return res(ctx.status(201), ctx.json(newStation));
  }),
  rest.put(`${BACKEND[CREWS.DANYEE].baseUrl}/stations/:id`, (req, res, ctx) => {
    if (req.body.name.length < 2 || req.body.name.length > 20) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: MESSAGE.ERROR.INVALID_STATION_NAME_LENGTH })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(req.params.id),
        ...req.body,
      })
    );
  }),
  rest.delete(`${BACKEND[CREWS.DANYEE].baseUrl}/stations/:id`, (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get(`${BACKEND[CREWS.DANYEE].baseUrl}/lines`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(LINE_LIST));
  }),
  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/lines`, (req, res, ctx) => {
    if (req.body.name.length < 2 || req.body.name.length > 10) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH })
      );
    }

    const newLine = {
      id: 100,
      ...req.body,
    };

    return res(ctx.status(201), ctx.json(newLine));
  }),
  rest.put(`${BACKEND[CREWS.DANYEE].baseUrl}/lines/:id`, (req, res, ctx) => {
    if (req.body.name.length < 2 || req.body.name.length > 10) {
      return res(
        ctx.status(400),
        ctx.json({ status: 400, message: MESSAGE.ERROR.INVALID_LINE_NAME_LENGTH })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(req.params.id),
        ...req.body,
      })
    );
  }),
  rest.delete(`${BACKEND[CREWS.DANYEE].baseUrl}/lines/:id`, (req, res, ctx) => {
    return res(
      ctx.status(204),
      ctx.json({
        status: 204,
        message: MESSAGE.SUCCESS.LINE_DELETED,
      })
    );
  }),

  rest.post(`${BACKEND[CREWS.DANYEE].baseUrl}/lines/:id/sections`, (req, res, ctx) => {
    const lineId = Number(req.params.id);
    const { upStationId, downStationId, distance } = req.body;

    const targetLine = LINE_LIST.find((line) => line.id === lineId);
    if (!targetLine) {
      return res(
        ctx.status(404),
        ctx.json({ status: 404, message: MESSAGE.ERROR.LINE_NOT_EXISTS })
      );
    }

    const upStation = targetLine.stations.find((station) => station.id === upStationId);
    const downStation = targetLine.stations.find((station) => station.id === downStationId);

    if (upStation && downStation) {
      return res(
        ctx.status(400),
        ctx.json({ status: 404, message: MESSAGE.ERROR.STATIONS_ALREADY_CONTAINS })
      );
    }

    if (!upStation && !downStation) {
      return res(
        ctx.status(400),
        ctx.json({
          status: 404,
          message: MESSAGE.ERROR.REQUIRE_CONNECT_STATION,
        })
      );
    }

    return res(ctx.status(201), ctx.json({ upStationId, downStationId, distance }));
  }),
  rest.delete(`${BACKEND[CREWS.DANYEE].baseUrl}/lines/:id/sections`, (req, res, ctx) => {
    const stationId = Number(req.url.searchParams.get('stationId'));
    const lineId = Number(req.params.id);

    const targetLine = LINE_LIST.find((line) => line.id === lineId);
    if (!targetLine) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: MESSAGE.ERROR.LINE_NOT_EXISTS,
        })
      );
    }

    const targetStation = targetLine.stations.find((station) => station.id === stationId);
    if (!targetStation) {
      return res(
        ctx.status(404),
        ctx.json({
          status: 404,
          message: MESSAGE.ERROR.DELETE_STATION_NOT_EXISTS,
        })
      );
    }

    return res(
      ctx.status(204),
      ctx.json({
        status: 204,
        message: MESSAGE.SUCCESS.SECTION_DELETED,
      })
    );
  }),

  rest.get(`${BACKEND[CREWS.DANYEE].baseUrl}/paths`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        defaultFare: 1250,
        distance: 10,
        stations: [
          { id: 5, name: '교대' },
          { id: 11, name: '서대문' },
        ],
      })
    );
  }),
];
