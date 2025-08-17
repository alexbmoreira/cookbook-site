import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function textSizeClass(size) {
  switch (size) {
    case 'sm':
      return '';
    case 'md':
      return 'text-xl';
    case 'lg':
      return 'text-3xl';
    default:
      return '';;
  }
}

const BlockHeader = ({title, size = 'md', translateTitle = true}) => {
  return (
    <div className='bg-carolina p-2'>
      <div className={`${textSizeClass(size)} text-white font-serif`}>
        {translateTitle && <FormattedMessage id={title}/>}
        {!translateTitle && <span>{title}</span>}
      </div>
    </div>
  );
};

BlockHeader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default BlockHeader;
