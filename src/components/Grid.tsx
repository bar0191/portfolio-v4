import * as React from 'react';

function Grid(): JSX.Element {


  return (
    <div className='grid'>
      <div className='grid__lines'>
        <div className='grid__line-hr top' />
        <div className='grid__line-hr mid' />
        <div className='grid__line-hr bottom' />
        <div className='grid__line-vr left' />
        <div className='grid__line-vr mid' />
        <div className='grid__line-vr right' />
      </div>
       <div className='grid__shadow top' />
       <div className='grid__shadow bottom' />
    </div>
  );
}

export default Grid;