import React, { useState } from 'react';

function Counter({ onCountChange }) {
  const [count, setCount] = useState(0);


  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(newCount);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Counter;
