import React from 'react';

import PropTypes from 'prop-types';

import './styles.css';

const button = (props) => {
  const { url, description, image } = props;

  return (
    <div className="button-sidebar-wrapper">
      <a className="button-sidebar" href={url}>
        <img src={image} />
      </a>
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
