import React from 'react';

const Button = ({ id, label, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button id={id} type="button" className={className} onClick={handleClick}>
      {label}
    </button>
  );
};

export default React.memo(Button);