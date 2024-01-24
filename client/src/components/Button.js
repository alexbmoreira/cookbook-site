import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const classesForTrait = (trait) => {
  switch (trait) {
    case 'primary':
      return 'rounded p-2 w-full bg-carolina hover:bg-carolina-hover active:bg-carolina-active text-white'
    case 'default':
      return 'flex justify-center items-center hover:bg-powder active:bg-powder-active';
    default:
      throw `${trait} is not a valid trait for Button`;
  }
};

const Button = observer(({onClick, trait, className, ...rest}) => {
  const [processing, setProcessing] = useState(false);

  const _onClick = async (e, cb) => {
    if (processing) return null;

    e.preventDefault();
    setProcessing(true);
    _handleCallback(e, cb);
  };

  const _handleCallback = async (e, cb) => {
    try {
      await Promise.resolve(cb(e));
    } finally {
      setProcessing(false);
    }
  }

  return (
    <button
      {...rest}
      className={`transition ease-in-out duration-200 ${classesForTrait(trait)} ${className ? className : ''}`}
      onClick={async (e) => _onClick(e, onClick)}
    />
  );
});

Button.propTypes = {
  trait: PropTypes.oneOf([
    'primary',
    'default'
  ])
};

Button.defaultProps = {
  trait: 'default'
};

export default Button;
