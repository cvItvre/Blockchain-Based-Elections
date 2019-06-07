import React from 'react';

import PropTypes from 'prop-types';

import './styles.css';

const button = (props) => {
  const { url, description, image } = props;

  return (
    <a className="button-sidebar-exp" href={url}>
      <img src={image} />
    </a>
  );
};

button.propTypes = {
  url: PropTypes.isRequired,
  description: PropTypes.isRequired,
};

export default button;
