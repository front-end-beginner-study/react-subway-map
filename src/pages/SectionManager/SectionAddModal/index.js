import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalTemplate, Input, Selector } from '../../../components';
import { COLOR, SIZE, INPUT_TEXT, BUTTON_ID } from '../../../constants';
import {
  ButtonWrapper,
  Form,
  LineName,
  SelectorWrapper,
  Validator,
} from './style';
import { Formik } from 'formik';
import { validateDistance, validateStationId } from '../../../utils';

const initialValues = {
  upStationId: '',
  downStationId: '',
  distance: '',
};

const validate = ({ upStationId, downStationId, distance }) => {
  const errors = {};

  errors.stationId = validateStationId({ upStationId, downStationId });

  if (errors.stationId) {
    return errors;
  }

  errors.distance = validateDistance({ distance });

  if (errors.distance) {
    return errors;
  }

  return {};
};

const SectionAddModal = ({
  stations,
  line,
  addSection,
  closeModal,
  onClickToClose,
}) => {
  const handleSubmitForm = async (values) => {
    const response = await addSection({ ...values, id: line.id });

    if (response.error) return;

    closeModal();
  };

  return (
    <ModalTemplate
      title={'구간 추가'}
      onClickToClose={onClickToClose}
      closeButton={<ModalTemplate.CloseButton onClose={closeModal} />}
    >
      <LineName color={line.color}>{line.name}</LineName>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit, getFieldProps }) => (
          <Form onSubmit={handleSubmit}>
            <SelectorWrapper>
              <Selector
                label={INPUT_TEXT.UP_STATION.LABEL}
                defaults={{
                  value: '',
                  option: INPUT_TEXT.UP_STATION.LABEL,
                  disabled: true,
                }}
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('upStationId')}
              />
              <span>↔️</span>
              <Selector
                label={INPUT_TEXT.DOWN_STATION.LABEL}
                defaults={{
                  value: '',
                  option: INPUT_TEXT.DOWN_STATION.LABEL,
                  disabled: true,
                }}
                options={stations}
                size={SIZE.LG}
                {...getFieldProps('downStationId')}
              />
            </SelectorWrapper>
            {errors.stationId && <Validator>{errors.stationId}</Validator>}
            <Input
              type="text"
              label="거리"
              placeholder="거리"
              size={SIZE.LG}
              {...getFieldProps('distance')}
            />
            {errors.distance && <Validator>{errors.distance}</Validator>}
            <ButtonWrapper>
              <Button
                type="submit"
                backgroundColor={COLOR.AMBER}
                aria-label={BUTTON_ID.SECTION_ADD}
              >
                확인
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </ModalTemplate>
  );
};

SectionAddModal.propType = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  line: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  addSection: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  onClickToClose: PropTypes.func.isRequired,
};

export default SectionAddModal;
