import { PropaneSharp } from "@mui/icons-material";
import React, { useState } from "react";
import '../styles/idbutton.css'

export default function IDButton(props) {
  const [count, setCount] = useState(0); // useState returns a pair. 'count' is the current state. 'setCount' is a function we can use to update the state.

  function increment() {
    //setCount(prevCount => prevCount+=1);
    setCount(function (prevCount) {
      props.parentCallback(count + 1);  
      return (prevCount += 1);
    })
  }

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        props.parentCallback(count - 1);  
        return (prevCount -= 1); 
      } else {
        props.parentCallback(count);  
        return (prevCount = 0);
      }
    });
  }

  return (
    <div className={props.className}>
      <span disabled={props.disabled} style={{fontSize : props.titlesize }} className="title">{props.title}</span>
      <button  disabled={props.disabled} className="button" onClick={decrement}>-</button>
      <span disabled={props.disabled} style={{fontSize : props.titlesize }} className="block">{count}</span>
      <button disabled={props.disabled} className="button" onClick={increment}>+</button>
    </div>
  );
}