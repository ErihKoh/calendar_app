import Calendar from 'components/Calendar/';
import React, { useState } from 'react';
import { formateDate } from 'utils/date';
import './App.css';

const App: React.FC = () => {
  const [selectedDate, selectDate] = useState(new Date());
  return (
    <div className='App'>
      <div className='date__container'>{formateDate(selectedDate, 'DD. MM. YYYY')}</div>
      <Calendar selectDate={selectDate} selectedDate={selectedDate} />
    </div>
  );
};

export default App;
