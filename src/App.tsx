import Calendar from 'components/Calendar/';
import React, { useState } from 'react';
import { getMonthNames } from 'utils/date';
import './App.css';

console.log(getMonthNames());

const App: React.FC = () => {
  const [selectedDate, selectDate] = useState(new Date());
  return (
    <div className='App'>
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
};

export default App;
