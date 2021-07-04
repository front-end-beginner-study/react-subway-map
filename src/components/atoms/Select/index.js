import PropTypes from 'prop-types';
import React from 'react';

import { Option, Selector } from './style';

export const Select = (props) => {
  const { id, name, optionHead, options, onChange, ...rest } = props;

  return (
    <label htmlFor={id} {...rest}>
      <Selector id={id} name={name} onChange={onChange} required>
        <Option value="" defaultValue hidden>
          {optionHead}
        </Option>
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
        ))}
      </Selector>
    </label>
  );
};

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  optionHead: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
