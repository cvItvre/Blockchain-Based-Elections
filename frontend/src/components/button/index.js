import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './styles.css';

const button = (props) => {
  const { url, description, image } = props;

  return (
    <div className="button-sidebar-wrapper">
      <Link to={url} className="button-sidebar" >
        <img src={image} />
      </ Link >
      {/* <a className="b ar" href={url}>
        <img src={image} />
      </a> */}
      <strong>{description}</strong>
    </div>
  );
};

button.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default button;
