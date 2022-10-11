import React from 'react';

const Step = ({text}) => {
  return (
    <div>
      <span className='font-serif'>{text}</span>
    </div>
  )
}

const Instructions = ({steps}) => {
  if (!steps) return null;

  return steps.map((step, index) => (
    <div className='space-y-1 text-sm'>
      <Step key={index} text={step}/>
    </div>
  ));
};

export default Instructions;
