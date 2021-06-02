import React, { MouseEventHandler } from "react";
import TEST_ID from "../../../@test/testId";
import { INPUT_PLACEHOLDER } from "../../../constants/placeholder";
import { Line, SectionAddRequestItem, Station } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";
import { CIRCLE_COLOR } from "../../../constants/color";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";
import useInput from "../../../hooks/@common/useInput";
import useSelect from "../../../hooks/@common/useSelect";
import { validateSectionDistance } from "../../../validations/section";

interface Props {
  onClose: MouseEventHandler<HTMLDivElement>;
  line: Line;
  stations: Station[];
  addSection: (sectionAddRequestItem: SectionAddRequestItem) => Promise<void>;
  deleteSection: ({ lineId, stationId }: { lineId: number; stationId: number }) => Promise<void>;
}

const SectionAddModal = ({ onClose, line, stations, addSection }: Props) => {
  const [firstStation, secondStation] = stations;

  const stationOptions = stations.map(({ id, name }) => ({
    value: id,
    text: name,
    backgroundColor: line.stations.some((station) => station.id === id) ? CIRCLE_COLOR[line.color] : "#eee",
  }));
  const { selectValue: upStationId, setValueOnChange: setUpStationIdOnChange } = useSelect(String(firstStation.id));
  const { selectValue: downStationId, setValueOnChange: setDownStationIdOnChange } = useSelect(
    String(secondStation.id)
  );
  const {
    inputValue: distance,
    errorMessage: distanceErrorMessage,
    setValueOnChange: setDistanceOnChange,
    validateOnBlur: validateDistanceOnBlur,
  } = useInput(validateSectionDistance);

  const onAddSection: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (distanceErrorMessage) {
      alert("구간을 추가할 수 없습니다");
      return;
    }

    await addSection({
      lineId: line.id,
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    });
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={onAddSection}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🔁 구간 추가</h3>
          <Input value={line.name} placeholder="노선 이름" style={{ marginBottom: "0.9375rem" }} disabled />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select
              data-testid={TEST_ID.SECTION_UP_STATION_SELECT}
              value={upStationId}
              onChange={setUpStationIdOnChange}
              defaultOption="이전역"
              options={stationOptions}
              required
              style={{ marginRight: "0.625rem" }}
            />
            <Select
              data-testid={TEST_ID.SECTION_DOWN_STATION_SELECT}
              value={downStationId}
              onChange={setDownStationIdOnChange}
              defaultOption="다음역"
              options={stationOptions}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Input
              value={distance}
              onChange={setDistanceOnChange}
              onBlur={validateDistanceOnBlur}
              errorMessage={distanceErrorMessage}
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              placeholder={INPUT_PLACEHOLDER.SECTION_DISTANCE}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button data-testid={TEST_ID.SECTION_ADD_BUTTON}>구간 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default SectionAddModal;
