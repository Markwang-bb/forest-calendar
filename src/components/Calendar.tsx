import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
];

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0);
};

const getFebDays = (year: number) => (isLeapYear(year) ? 29 : 28);

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [showMonthList, setShowMonthList] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const monthListRef = useRef<HTMLDivElement>(null);

  const generateCalendar = (month: number, year: number) => {
    const calendarDays: (number | null)[] = [];
    const daysOfMonth = [
      31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    
    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }
    for (let i = 1; i <= daysOfMonth[month]; i++) {
      calendarDays.push(i);
    }
    return calendarDays;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthListRef.current && !monthListRef.current.contains(event.target as Node)) {
        setShowMonthList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthChange = (index: number) => {
    setCurrentMonth(index);
    setShowMonthList(false);
  };

  const handleYearChange = (direction: 'prev' | 'next') => {
    setCurrentYear(prevYear => prevYear + (direction === 'next' ? 1 : -1));
  };

  const calendarDays = generateCalendar(currentMonth, currentYear);
  const currentMonthName = monthNames[currentMonth];

  return (
    <div className="relative w-max h-max p-8 bg-sky-400 rounded-3xl overflow-hidden">
      {/* Real-time Clock */}
      <div className="absolute top-2 inset-x-0 flex flex-col items-center text-white">
        <div className="text-xl">{currentDate.toLocaleDateString()}</div>
        <div className="text-2xl font-bold">{currentDate.toLocaleTimeString()}</div>
      </div>

      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white p-2 mt-12">
        <span 
          className="cursor-pointer hover:bg-light-btn rounded px-2 py-1"
          onClick={() => setShowMonthList(!showMonthList)}
        >
          {currentMonthName}
        </span>
        <div className="flex items-center">
          <span 
            className="cursor-pointer hover:bg-light-btn rounded-full p-2 mx-1" 
            onClick={() => handleYearChange('prev')}
          >
            {'<'}
          </span>
          <span id="year">{currentYear}</span>
          <span 
            className="cursor-pointer hover:bg-light-btn rounded-full p-2 mx-1" 
            onClick={() => handleYearChange('next')}
          >
            {'>'}
          </span>
        </div>
      </div>

      {/* Month List */}
      {showMonthList && (
        <div 
          ref={monthListRef}
          className="absolute top-16 left-0 bg-gray-100 rounded-lg p-2 grid grid-cols-3 gap-2"
        >
          {monthNames.map((month, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-light-btn rounded-lg text-center"
              onClick={() => handleMonthChange(index)}
            >
              {month}
            </div>
          ))}
        </div>
      )}

      {/* Calendar Body */}
      <div className="p-2 mt-10">
        <div className="grid grid-cols-7 font-semibold text-gray-600">
          <div className="text-center">Sun</div>
          <div className="text-center">Mon</div>
          <div className="text-center">Tue</div>
          <div className="text-center">Wed</div>
          <div className="text-center">Thu</div>
          <div className="text-center">Fri</div>
          <div className="text-center">Sat</div>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={classNames('flex items-center justify-center h-8 cursor-pointer rounded-lg',
                { 'bg-light-btn text-dark-text': day === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() }
              )}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
