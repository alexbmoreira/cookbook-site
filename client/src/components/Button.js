import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const classesForTrait = (trait) => {
  switch (trait) {
    case 'primary':
      return 'bg-carolina hover:bg-carolina-hover active:bg-carolina-active text-white'
    default:
      return 'hover:bg-powder active:bg-powder-active'
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
      className={`border-silver border rounded p-2 w-full transition ease-in-out duration-200 ${classesForTrait(trait)} ${className ? className : ''}`}
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
