import React, { useState } from 'react';
import { observer } from 'mobx-react';

const Button = observer(({onClick, ...rest}) => {
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
      className='border-silver border rounded p-2 w-full'
      onClick={async (e) => _onClick(e, onClick)}
    />
  );
});

export default Button;
