import { useState } from "react";
import { LineAddRequestItem, Station } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";
import useInput from "../../../hooks/@common/useInput";
import useSelect from "../../../hooks/@common/useSelect";
import { validateLineName } from "../../../validations/line";
import { validateSectionDistance } from "../../../validations/section";
import { CIRCLE_COLOR_CODE } from "../../../constants/color";
import { TEST_ID } from "../../../@test/testId";

interface Props {
  closeModal: () => void;
  stations: Station[];
  addLine: (lineRequestItem: LineAddRequestItem) => void;
}

const LineAddModal = ({ closeModal, stations, addLine }: Props) => {
  const [firstStation, secondStation] = stations;

  const { inputValue: lineName, errorMessage: lineNameErrorMessage, setValueOnChange: setLineNameOnChange } = useInput(
    validateLineName
  );
  const { selectValue: upStationId, setValueOnChange: setUpStationOnChange } = useSelect(String(firstStation.id));
  const { selectValue: downStationId, setValueOnChange: setDownStationOnChange } = useSelect(String(secondStation.id));
  const { inputValue: distance, errorMessage: disatanceErrorMessage, setValueOnChange: setDistanceOnChange } = useInput(
    validateSectionDistance
  );

  const DEFAULT_COLOR = "bg-cyan-500";
  const [color, setColor] = useState<CIRCLE_COLOR_CODE>(DEFAULT_COLOR);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (lineNameErrorMessage || disatanceErrorMessage) {
      alert("노선을 추가할 수 없습니다");
      return;
    }

    try {
      await addLine({
        color,
        distance: Number(distance),
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        name: lineName,
      });
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const stationOptions = stations.map(({ id, name }) => ({ value: id, text: name }));

  return (
    <Modal onClose={closeModal}>
      <form onSubmit={onSubmit}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem", alignItems: "flex-start" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🛤️ 노선 추가</h3>
          <Input
            data-testid={TEST_ID.LINE_NAME_INPUT}
            value={lineName}
            errorMessage={lineNameErrorMessage}
            onChange={setLineNameOnChange}
            placeholder="노선 이름"
            style={{ marginBottom: "0.9375rem" }}
            required
          />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select
              data-testid={TEST_ID.LINE_UP_STATION_SELECT}
              value={upStationId}
              onChange={setUpStationOnChange}
              options={stationOptions}
              style={{ marginRight: "0.625rem" }}
              required
            />
            <Select
              data-testid={TEST_ID.LINE_DOWN_STATION_SELECT}
              value={downStationId}
              onChange={setDownStationOnChange}
              options={stationOptions}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem", flexDirection: "column" }}>
            <Input
              data-testid={TEST_ID.LINE_DISTANCE_INPUT}
              type="number"
              value={distance}
              errorMessage={disatanceErrorMessage}
              onChange={setDistanceOnChange}
              step="0.1"
              min="0.1"
              placeholder="상행 하행역 거리(km)"
              required
            />
          </Flex>
          <ColorPicker color={color} onSetColor={setColor} style={{ marginBottom: "0.9375rem" }} />
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button data-testid={TEST_ID.LINE_ADD_BUTTON}>노선 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default LineAddModal;
