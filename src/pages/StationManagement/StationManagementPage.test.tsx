import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import { useAppDispatch } from "../../hooks";

import initialState from "../../fixtures/redux";
import mockStore from "../../utils/mockStore";
import StationManagementPage from "./StationManagementPage";

const mockedUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>;

const store = mockStore(initialState);

beforeEach(() => {
  mockedUseAppDispatch.mockImplementation(() => store.dispatch);
});

afterEach(() => {
  store.clearActions();
});

describe("지하철 역페이지 테스트", () => {
  describe("지하철 역 조회 기능", () => {
    describe("역 데이터가 이미 존재하는 경우", () => {
      it("사용자는 등록되어 있는 전체 지하철 역 목록을 조회할 수 있다", () => {
        const { getByText } = render(<StationManagementPage />);
        const [lastListItem] = initialState.station.items.slice(-1);

        getByText(lastListItem.name);
      });
    });
  });

  describe("지하철 역 추가 기능", () => {
    describe("역 이름이 2자 이상 20자 이하의 한글 또는 숫자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 있다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        fireEvent.change(getByTestId("station-name-input"), {
          target: { value: "테스트역" },
        });

        fireEvent.click(getByTestId("station-add-button"));

        await waitFor(() => {
          const [action1, action2] = store.getActions();
          expect(action1).toMatchObject({ type: "[STATION] ADD/pending" });
          expect(action2).toMatchObject({ type: "[STATION] ADD/fulfilled" });
        });
      });
    });

    describe("역 이름이 2자 미만인 경우 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        fireEvent.change(getByTestId("station-name-input"), {
          target: { value: "테" },
        });

        fireEvent.click(getByTestId("station-add-button"));

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("역 이름이 20자보다 긴 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        fireEvent.change(getByTestId("station-name-input"), {
          target: {
            value: "테스트테스트테스트테스트테스트테스트테스트테스트테스트",
          },
        });

        fireEvent.click(getByTestId("station-add-button"));

        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });

    describe("역 이름이 특수문자를 포함하는 경우", () => {
      it("사용자는 지하철 역을 추가할 수 없다", async () => {
        const { getByTestId } = render(<StationManagementPage />);

        fireEvent.change(getByTestId("station-name-input"), {
          target: { value: "!!!!!????" },
        });

        fireEvent.click(getByTestId("station-add-button"));
        await waitFor(() => {
          const actions = store.getActions();
          expect(actions).toEqual([]);
        });
      });
    });
  });

  describe("지하철 역 삭제 기능", () => {
    describe("삭제하려는 역이 노선에 등록되어 있는 역이 아닌 경우", () => {
      it("사용자는 지하철 역을 삭제할 수 있다", async () => {
        const { getAllByText } = render(<StationManagementPage />);

        const [firstDeleteButton] = getAllByText("삭제");
        fireEvent.click(firstDeleteButton);

        await waitFor(() => {
          const [action1, action2] = store.getActions();
          expect(action1).toMatchObject({ type: "[STATION] DELETE/pending" });
          expect(action2).toMatchObject({ type: "[STATION] DELETE/fulfilled" });
        });
      });
    });

    describe("삭제하려는 역이 노선에 등록되어 있는 역인 경우", () => {
      it("사용자는 지하 철 역을 삭제할 수 없다", async () => {
        const mockedAxiosDelete = axios.delete as jest.MockedFunction<
          typeof axios.delete
        >;

        mockedAxiosDelete.mockImplementation(async () => {
          throw Error("에러!");
        });

        const { getAllByText } = render(<StationManagementPage />);

        const [firstDeleteButton] = getAllByText("삭제");
        fireEvent.click(firstDeleteButton);

        await waitFor(() => {
          const [action1, action2] = store.getActions();
          expect(action1).toMatchObject({ type: "[STATION] DELETE/pending" });
          expect(action2).toMatchObject({ type: "[STATION] DELETE/rejected" });
        });
      });
    });
  });
});
