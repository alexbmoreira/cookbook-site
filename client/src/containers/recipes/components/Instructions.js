import React from 'react';
import { HtmlRender } from '../../../components';

const Instructions = ({steps}) => {
  if (!steps) return null;

  return (
    <React.Fragment>
      <HtmlRender html={steps} className='space-y-2 text-sm'/>
    </React.Fragment>
  )
};

export default Instructions;
