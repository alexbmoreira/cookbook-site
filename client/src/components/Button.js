import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const classesForTrait = (trait) => {
  switch (trait) {
    case 'primary':
      return 'rounded p-2 w-full bg-carolina hover:bg-carolina-hover active:bg-carolina-active text-white disabled:bg-carolina'
    case 'powder':
      return 'flex justify-center items-center bg-powder hover:bg-powder-hover active:bg-powder-active disabled:bg-powder';
    case 'default':
      return 'flex justify-center items-center bg-white hover:text-lapis active:text-lapis-active disabled:bg-white';
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
      className={`transition ease-in-out duration-200 cursor-pointer disabled:text-silver disabled:cursor-default ${classesForTrait(trait)} ${className ? className : ''}`}
      onClick={async (e) => _onClick(e, onClick)}
    />
  );
});

Button.propTypes = {
  trait: PropTypes.oneOf([
    'primary',
    'powder',
    'default'
  ])
};

Button.defaultProps = {
  trait: 'default'
};

export default Button;
