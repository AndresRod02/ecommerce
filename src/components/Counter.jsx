import React from 'react';
import { useReducer } from 'react';
import Button from 'react-bootstrap/Button';
const Counter = ({onChange, initial}) => {
  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + action.value;
        case 'DECREMENT':
          return state - action.value;
          default:
            return state;
          }
        };
const [count, dispatch] = useReducer(counterReducer, initial);
  
  
  const handleIncrement = () => {
    dispatch({ type: 'INCREMENT', value: 1 });
    onChange(count + 2); 
  };
  
  const handleDecrement = () => {
    if (count > 1) {
      dispatch({ type: 'DECREMENT', value: 1 });
      onChange(count - 2);
    }
  };
  
  
    return (
      <div style={{paddingLeft: '10px'}}>
        <Button onClick={handleDecrement}>-</Button>
        <span style={{marginLeft: '10px'}}>{count}</span>
        <Button onClick={handleIncrement} style={{marginLeft: '10px'}}>+</Button>
      </div>
    );
  };
  
  export default Counter;
  