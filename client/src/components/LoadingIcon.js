import React from 'react';
import PropTypes from 'prop-types';

const LoadingIcon = ({ color }) => {
  const _color = () => {
    switch (color) {
      case 'carolina':
        return 'border-carolina'
      case 'silver':
        return 'border-silver'
      default:
        throw `${color} is not a valid color for LoadingIcon`;
    }
  }
  return (
    <div className='w-full h-full flex'>
      <div className={`my-8 mx-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-t-transparent ${_color()}`}>
        <div className='h-full w-full flex items-center justify-center'>
          <div className={`inline-block h-8 w-8 animate-spin-reverse rounded-full border-4 border-b-transparent ${_color()}`}/>
        </div>
      </div>
    </div>
  );
};

LoadingIcon.propTypes = {
  color: PropTypes.oneOf([
    'carolina',
    'silver'
  ])
};

LoadingIcon.defaultProps = {
  color: 'carolina'
};

export default LoadingIcon;
