import React from 'react';

import Button from '../button';

import './styles.css';

const sideBar = () => (
  <div className="main-sidebar">
    <Button url="https://www.w3schools.com/css/css_positioning.asp" description="CSS Positioning" />
    <Button url="https://www.youtube.com/watch?v=TI4v4Y8yRjw&t=15s" description="Style Guide" />
    <Button url="https://www.primefaces.org/primereact/#/setup" description="Prime React" />
  </div>
);

export default sideBar;
