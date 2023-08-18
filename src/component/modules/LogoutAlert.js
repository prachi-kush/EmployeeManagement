import React from 'react';

const LogoutAlert = ({ onCancel, onConfirm }) => {
  return (
    <div>
      <p>Are you sure you want to log out?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>OK</button>
    </div>
  );
};

export default LogoutAlert;
