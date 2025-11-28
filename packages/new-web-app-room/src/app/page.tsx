'use client';

import { useState } from 'react';

export default function HongKongCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Hong Kong holidays for 2024 and 2025
  const holidays: Record<string, { name: string; emoji: string }> = {
    '2024-01-01': { name: "New Year's Day", emoji: '🎊' },
    '2024-02-10': { name: 'Chinese New Year', emoji: '🧧' },
    '2024-02-11': { name: 'Chinese New Year', emoji: '🧧' },
    '2024-02-12': { name: 'Chinese New Year', emoji: '🧧' },
    '2024-03-29': { name: 'Good Friday', emoji: '✝️' },
    '2024-04-01': { name: 'Easter Monday', emoji: '🐰' },
    '2024-04-04': { name: 'Ching Ming Festival', emoji: '🌸' },
    '2024-05-01': { name: 'Labour Day', emoji: '⚒️' },
    '2024-05-15': { name: "Buddha's Birthday", emoji: '🙏' },
    '2024-06-10': { name: 'Dragon Boat Festival', emoji: '🐉' },
    '2024-07-01': { name: 'HKSAR Establishment Day', emoji: '🇭🇰' },
    '2024-09-18': { name: 'Mid-Autumn Festival', emoji: '🥮' },
    '2024-10-01': { name: 'National Day', emoji: '🇨🇳' },
    '2024-10-11': { name: 'Chung Yeung Festival', emoji: '🏔️' },
    '2024-12-25': { name: 'Christmas Day', emoji: '🎄' },
    '2024-12-26': { name: 'Boxing Day', emoji: '🎁' },
    '2025-01-01': { name: "New Year's Day", emoji: '🎊' },
    '2025-01-29': { name: 'Chinese New Year', emoji: '🧧' },
    '2025-01-30': { name: 'Chinese New Year', emoji: '🧧' },
    '2025-01-31': { name: 'Chinese New Year', emoji: '🧧' },
    '2025-04-04': { name: 'Ching Ming Festival', emoji: '🌸' },
    '2025-04-18': { name: 'Good Friday', emoji: '✝️' },
    '2025-04-21': { name: 'Easter Monday', emoji: '🐰' },
    '2025-05-01': { name: 'Labour Day', emoji: '⚒️' },
    '2025-05-05': { name: "Buddha's Birthday", emoji: '🙏' },
    '2025-05-31': { name: 'Dragon Boat Festival', emoji: '🐉' },
    '2025-07-01': { name: 'HKSAR Establishment Day', emoji: '🇭🇰' },
    '2025-09-06': { name: 'Mid-Autumn Festival', emoji: '🥮' },
    '2025-10-01': { name: 'National Day', emoji: '🇨🇳' },
    '2025-10-07': { name: 'Chung Yeung Festival', emoji: '🏔️' },
    '2025-12-25': { name: 'Christmas Day', emoji: '🎄' },
    '2025-12-26': { name: 'Boxing Day', emoji: '🎁' }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getHoliday = (day: number) => {
    if (!day) return null;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateKey = `${year}-${month}-${dayStr}`;
    return holidays[dateKey] || null;
  };



  const getMonthHolidays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    return Object.entries(holidays).filter(([date]) => {
      const [holidayYear, holidayMonth] = date.split('-');
      return parseInt(holidayYear) === year && parseInt(holidayMonth) === month;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationDirection(direction);
    
    setTimeout(() => {
      const newDate = new Date(currentDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      setCurrentDate(newDate);
      
      setTimeout(() => {
        setIsAnimating(false);
        setAnimationDirection('');
      }, 300);
    }, 300);
  };

  const days = getDaysInMonth(currentDate);
  const monthHolidays = getMonthHolidays();

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Hong Kong Holiday Calendar</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'
            } shadow-lg`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            disabled={isAnimating}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
          >
            ← Previous
          </button>
          
          <h2 className={`text-lg sm:text-xl lg:text-2xl font-semibold transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
          }`}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            disabled={isAnimating}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
          >
            Next →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 sm:p-6 mb-6 overflow-hidden w-full`}>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
            {dayNames.map((day) => (
              <div
                key={day}
                className={`text-center font-semibold py-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className={`grid grid-cols-7 gap-1 sm:gap-2 transition-all duration-300 ${
            isAnimating 
              ? animationDirection === 'next' 
                ? 'transform translate-x-full opacity-0' 
                : 'transform -translate-x-full opacity-0'
              : 'transform translate-x-0 opacity-100'
          }`}>
            {days.map((day, index) => {
              const holiday = day ? getHoliday(day) : null;
              return (
                <div
                  key={index}
                  className={`aspect-square flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base ${
                    day
                      ? holiday
                        ? isDarkMode
                          ? 'bg-red-600 text-white hover:bg-red-500'
                          : 'bg-red-500 text-white hover:bg-red-400'
                        : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      : ''
                  }`}
                >
                  {day && (
                    <>
                      <span className="text-lg font-medium">{day}</span>
                      {holiday && (
                        <span className="text-xs mt-1">{holiday.emoji}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Holiday Summary */}
        {monthHolidays.length > 0 && (
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-6`}>
            <h3 className="text-xl font-semibold mb-4">
              Holidays in {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="space-y-2">
              {monthHolidays.map(([date, holiday]) => {
                const [, , day] = date.split('-');
                return (
                  <div
                    key={date}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{holiday.emoji}</span>
                    <div>
                      <span className="font-medium">{holiday.name}</span>
                      <span className={`ml-2 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {monthNames[currentDate.getMonth()]} {parseInt(day)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


















