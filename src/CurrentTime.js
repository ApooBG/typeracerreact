import React from 'react';
import { useState, useEffect } from 'react';
const getTime = () => {
    const current = new Date();
      return(current.getHours()*60*60 + current.getMinutes()*60 + current.getSeconds());  
}

function Timer() {
  const [counter, setCounter] = React.useState(60);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      console.log(counter);
    return () => clearInterval(timer);
  }, [counter]);
}

export default {getTime};
export {Timer};

