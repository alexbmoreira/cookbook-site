import React, { useState } from 'react';
import { observer } from 'mobx-react';

const IconButton = observer(({onClick, size, className, children, ...rest}) => {
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
      className={`flex h-7 w-7 rounded-full bg-night-clear justify-center items-center cursor-pointer transition ease-in-out duration-200 hover:bg-night-hover active:bg-night-active ${className || ''}`}
      onClick={async (e) => _onClick(e, onClick)}
    >
      {children}
    </button>
  );
});

export default IconButton;
