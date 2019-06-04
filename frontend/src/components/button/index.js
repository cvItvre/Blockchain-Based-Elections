import React from 'react';

import PropTypes from 'prop-types';

import './styles.css';

const button = (props) => {
  const { url, description } = props;

  return (
    <a className="button-sidebar" href={url}>
      {description}
    </a>
  );
};

button.propTypes = {
  url: PropTypes.isRequired,
  description: PropTypes.isRequired,
};

export default button;
