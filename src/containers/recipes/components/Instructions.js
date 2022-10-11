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

  return (
    <div className='space-y-2 text-sm'>
      {steps.map((step, index) => (
        <Step key={index} text={step}/>
      ))}
    </div>
  )
};

export default Instructions;
