'use client';

import { useState } from 'react';

// Hong Kong public holidays for 2024-2025
const hongKongHolidays = {
  2024: [
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-02-10', name: 'Chinese New Year' },
    { date: '2024-02-12', name: 'Chinese New Year' },
    { date: '2024-02-13', name: 'Chinese New Year' },
    { date: '2024-03-29', name: 'Good Friday' },
    { date: '2024-04-01', name: 'Easter Monday' },
    { date: '2024-04-04', name: 'Ching Ming Festival' },
    { date: '2024-05-01', name: 'Labour Day' },
    { date: '2024-05-15', name: 'Buddha\'s Birthday' },
    { date: '2024-06-10', name: 'Dragon Boat Festival' },
    { date: '2024-07-01', name: 'HKSAR Establishment Day' },
    { date: '2024-09-18', name: 'Mid-Autumn Festival' },
    { date: '2024-10-01', name: 'National Day' },
    { date: '2024-10-11', name: 'Chung Yeung Festival' },
    { date: '2024-12-25', name: 'Christmas Day' },
    { date: '2024-12-26', name: 'Boxing Day' }
  ],
  2025: [
    { date: '2025-01-01', name: 'New Year\'s Day' },
    { date: '2025-01-29', name: 'Chinese New Year' },
    { date: '2025-01-30', name: 'Chinese New Year' },
    { date: '2025-01-31', name: 'Chinese New Year' },
    { date: '2025-04-04', name: 'Ching Ming Festival' },
    { date: '2025-04-18', name: 'Good Friday' },
    { date: '2025-04-21', name: 'Easter Monday' },
    { date: '2025-05-01', name: 'Labour Day' },
    { date: '2025-05-05', name: 'Buddha\'s Birthday' },
    { date: '2025-05-31', name: 'Dragon Boat Festival' },
    { date: '2025-07-01', name: 'HKSAR Establishment Day' },
    { date: '2025-10-01', name: 'National Day' },
    { date: '2025-10-06', name: 'Mid-Autumn Festival' },
    { date: '2025-10-29', name: 'Chung Yeung Festival' },
    { date: '2025-12-25', name: 'Christmas Day' },
    { date: '2025-12-26', name: 'Boxing Day' }
  ]
};

export default function HongKongCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get holidays for current month
  const currentYearHolidays = hongKongHolidays[currentYear as keyof typeof hongKongHolidays] || [];
  const currentMonthHolidays = currentYearHolidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate.getMonth() === currentMonth;
  });
  
  const isHoliday = (day: number) => {
    return currentMonthHolidays.some(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getDate() === day;
    });
  };
  
  const getHolidayName = (day: number) => {
    const holiday = currentMonthHolidays.find(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getDate() === day;
    });
    return holiday?.name;
  };
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Create calendar grid
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-lg shadow-lg p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Hong Kong Holiday Calendar
            </h1>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth('prev')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              ← Previous
            </button>
            
            <h2 className={`text-2xl font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {monthNames[currentMonth]} {currentYear}
            </h2>
            
            <button
              onClick={() => navigateMonth('next')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Next →
            </button>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {/* Day headers */}
            {daysOfWeek.map(day => (
              <div key={day} className={`p-3 text-center font-semibold transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300 bg-gray-700' 
                  : 'text-gray-600 bg-gray-100'
              }`}>
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`
                  p-3 h-24 border transition-colors duration-300
                  ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}
                  ${day 
                    ? isDarkMode ? 'bg-gray-800' : 'bg-white'
                    : isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  }
                  ${isHoliday(day || 0) 
                    ? isDarkMode 
                      ? 'bg-red-900 border-red-600' 
                      : 'bg-red-100 border-red-300'
                    : ''
                  }
                `}
              >
                {day && (
                  <div>
                    <div className={`
                      text-sm font-medium transition-colors duration-300
                      ${isHoliday(day) 
                        ? isDarkMode ? 'text-red-300' : 'text-red-700'
                        : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }
                    `}>
                      {day}
                    </div>
                    {isHoliday(day) && (
                      <div className={`text-xs mt-1 leading-tight transition-colors duration-300 ${
                        isDarkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {getHolidayName(day)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Holiday Legend */}
          <div className={`mt-6 p-4 rounded transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Holidays this month:
            </h3>
            {currentMonthHolidays.length > 0 ? (
              <ul className="space-y-1">
                {currentMonthHolidays.map((holiday, index) => (
                  <li key={index} className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      {new Date(holiday.date).getDate()}
                    </span>
                    {' - '}
                    {holiday.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>No holidays this month</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}







