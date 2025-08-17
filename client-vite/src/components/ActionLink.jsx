import React, { useState } from 'react';
import { observer } from 'mobx-react';

const ActionLink = observer(({onClick, className, ...rest}) => {
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
      className={`transition ease-in-out duration-200 text-carolina h-full text-center cursor-pointer hover:text-carolina-hover active:text-carolina-active ${className || ''}`}
      onClick={async (e) => _onClick(e, onClick)}
    />
  );
});

export default ActionLink;