import React from 'react';
import { CountReasults } from './countReasults';

export function MainWrapper(props) {

  return (
    <div>
      < CountReasults count={props.count} />

      <div>
        <input type="text" placeholder='name'/>
        <input type="text" placeholder='email'/>
        <button>Submit</button>
      </div>
    </div>
  )
}

