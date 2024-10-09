import React, { useState } from "react";
 
const Toggle = (props) => {
  const [isToggleOn, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!isToggleOn);
    sendData();
  }

  const sendData = () => {
    props.parentCallback(props.type , props.id , !isToggleOn);
  }

  return (
    <button
      id={props.id}
      class={isToggleOn === false ? 'button is-light' : 'button is-dark'}
      onClick={handleClick}
    >{props.title} </button>
  );
}

export default Toggle;