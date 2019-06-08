import React from 'react';

import PropTypes from 'prop-types';

import './styles.css';

const button = (props) => {
  const { url, description, image } = props;

  /*return (
    <a className="button-sidebar" href={url}>
      {description}
    </a>
  );*/

  return (
    <a className="button-sidebar-exp" href={url}>
      <img src={image} />
    </a>
  );
};

button.propTypes = {
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default button;
