import React from 'react';
import Button from './Button';

const TeamButtons = ({ buttons, onTeamClick }) => {
  return (
    <ul id="TeamButtonContainer" className="bg-gray-100 framed buttons">
      {buttons.map((button) => (
        <li key={button.id}>
          <Button
            id={button.id}
            label={button.label}
            onClick={() => onTeamClick(button.container, button.endpoint)}
            className="text-sm"
          />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TeamButtons);