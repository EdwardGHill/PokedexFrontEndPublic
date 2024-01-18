import React from 'react';

const TypeButton = ({ type, selected, onClick, typeColors }) => {
  const buttonClasses = `typeButton ${typeColors[type][selected ? 'dark' : 'normal']} ${
    typeColors[type].whiteText || ''
  } font-bold py-2 px-4 rounded-full`;

  return (
    <button type="button" className={buttonClasses} onClick={() => onClick(type)}>
      {type}
    </button>
  );
};

const MemoizedTypeButton = React.memo(TypeButton);

export default MemoizedTypeButton;