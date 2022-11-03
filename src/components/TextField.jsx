import React from 'react';

const TextField = ({
  name,
  type,
  placeholder,
  labelText,
  infoText,
  onChange,
}) => {
  return (
    <div className="text-field">
      <label htmlFor="name" className="text-field__label">
        {labelText}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={(data) => onChange(data.target)}
        className="text-field__input"
        placeholder={placeholder}
        required
      />
      <span className="text-field__info">{infoText}</span>
    </div>
  );
};

export default TextField;
