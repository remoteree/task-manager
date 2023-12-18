import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 10) {
      setMessage('Count is greater than 10');
    } else {
      setMessage('');
    }
  }, [count]);


  const handleCountChange = (newCount) => {
    setCount(newCount);
  };
  return (
    <div>
      {message && <p>{message}</p>}
      <Counter
        onCountChange={handleCountChange}
      />
    </div>
  );
}

export default App;
