import React from 'react';
import '../styles/Switch.css';

const Switch: React.FC<{isOn: any, handleToggle: any}> = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox'
        id={`react-switch-new`}
        type='checkbox'
      />
      <label
        style={{ background: isOn && '#06D6A0'}}
        className='react-switch-label'
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  )
}

export default Switch
