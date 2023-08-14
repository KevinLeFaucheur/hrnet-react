/*  */
export const range = (min, max) => Array.from({ length: (max - min + 1) }, (_, i) => min + i);
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/*  */
export const daysCount = (year, month) => new Date(year, month + 1, 0).getDate();
export const weekCount = (daysCount) => Math.ceil(daysCount / 7);

/**
 * Fills the calendar with an array for each week for each date visible
 * Includes previous and next month days if needed to be seen
 * @param {Date} date        - 
 * @returns {Array.<Date[]>} - 
 */
export const calendarBuilder = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  let days = daysCount(year, month, 0);
  let start = new Date(year, month).getDay();
  let end = start + days;
  let prevMonthYear = month === 0 ? year - 1 : year;
  let prevMonth = month === 0 ? 11 : month - 1;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextMonthYear = month === 11 ? year + 1 : year;
  let prevMonthDaysCount = daysCount(prevMonthYear, prevMonth, 0);
  let weeks = weekCount(start + days);
  let length = weeks * 7;
  let cells = [...Array(length)];

  for (let i = 0; i < length; i++) {
    if(i < start) {
      cells[i] = new Date(prevMonthYear, prevMonth, prevMonthDaysCount - start + i + 1);
    } else if(i < end) {
      cells[i] = new Date(year, month, i - start + 1);
    } else {
      cells[i] = new Date(nextMonthYear, nextMonth, i - days - start + 1);
    }
  }

  let calendar = [];
  for (let i = 0; i < weeks; i++) {
    calendar[i] = cells.slice(i * 7 , (i+1) * 7);
  }
  return calendar;
}

/**
 * Adds the corresponding CSS class for :
 *  selected, greyed out, today and hightlighted dates
 * @param {Date} sDate                             - current selected Date by user
 * @param {Date} tdDate                            - td Date to display in calendar
 * @param {Object.<number|HighlightedDate>} dates  - Date timepstamps or HighlightedDates to check upon
 * @returns {string}                               - classNames for this td
 */
export const selectClass = (sDate, tdDate, dates) => {
  let className = [];
  let [minDate, maxDate] = dates.minMaxDates; 
  let minDateTimestamp = Date.parse(minDate);
  let maxDateTimestamp = Date.parse(maxDate);

  if(sDate.getMonth() !== tdDate.getMonth()) {
    className.push('greyed');
  }

  if(dates.disabledWeekDays.includes(tdDate.getDay())) {
    className.push('disabled');
  }

  if(dates.disabledDates.includes(Date.parse(tdDate))) {
    className.push('disabled');
  }

  if(minDateTimestamp !== false && Date.parse(tdDate) < minDateTimestamp) {
    className.push('disabled');
  }

  if(maxDateTimestamp !== false && Date.parse(tdDate) > maxDateTimestamp) {
    className.push('disabled');
  }

  if(dates.allowDates.length > 0) {
    if(dates.allowDates.includes(Date.parse(tdDate))) {
      className = className.filter(className => className !== 'disabled');
    }
    else {
      className.push('disabled');
    } 
  }

  if(tdDate.getDay() === 0 || tdDate.getDay() === 6 || dates.weekends.includes(Date.parse(tdDate))) {
    className.push('weekend');
  }

  let now = new Date(Date.now());
  let nowTimeless = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if(Date.parse(nowTimeless) === Date.parse(tdDate)) {
    className.push('today');
  }

  let dateFound = dates.highlightedDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    if(dateFound.style) {
      dateFound.style.split(',').forEach(style => className.push(style));
    }
    else className.push('highlighted');
  }

  if (sDate.getFullYear() === tdDate.getFullYear()
    && sDate.getMonth() === tdDate.getMonth()
    && sDate.getDate() === tdDate.getDate()) {
      className = [];
      className.push('selected');
  }

  return className.join(' ');
}

/**
 * Finds if a date has a description within the Highlighted Dates array
 * @param {Date} tdDate                           - Date Object to check if a title exists for it
 * @param {Array.<HighlightedDate>} arrayOfDates  - All Highlighted Dates to check upon
 * @returns {string}                              - Description added to the title attribute
 */
export const selectTitle = (tdDate, arrayOfDates) => {
  let dateFound = arrayOfDates.find(date => date.timestamp === Date.parse(tdDate));
  if (dateFound) {
    return dateFound.desc;
  }
  return '';
}

 /**
  * 
  * @param {Array.<string>} hlDates     - string of valid date, optional desc and optional className
  * @returns {Array.<HighlightedDate>}  - Highlighted Dates, to be compared with Periods then used in Calendar
  */
 export const getHighlightedDates = (hlDates) => {
  let dates = [];

  if (hlDates && Array.isArray(hlDates) && hlDates.length) {

    hlDates.forEach(date => {
      let dateStruct = date.split(',').map(value => value.trim());
      let highlightedDate = {
        key: formatDate(dateStruct[0]),
        timestamp: Date.parse(dateStruct[0]),
        desc: dateStruct[1],
        style: dateStruct[2],
      }
      let existingDate = dates.find(date => date.key === highlightedDate.key);
      if(existingDate !== undefined) {

        let hasDescription = existingDate.desc && existingDate.desc.length;
        let hasAlsoDescritpion = highlightedDate.desc && highlightedDate.desc.length;

        if(hasDescription && hasAlsoDescritpion) {
          existingDate.desc += "\n" + highlightedDate.desc;
        }
      } else {
        dates.push(highlightedDate);
      }
    })
  }
  return dates;
}

/**
 * Builds an array of HighlightedDate for a period,
 * Checking if each period day overlaps with an already highlighted day
 * @param {string|Array.<string>} hlPeriods - string, or array of string of valid date, optional desc and optional className
 * @param {Array.<HighlightedDate>} hlDates - Highlighted Dates to find overlaps
 * @returns {Array.<HighlightedDate>}       - Complete array of Highlighted Dates including overlaps
 */
export const getHighlightedPeriod = (hlPeriods, hlDates) => {
  let dates = hlDates;

  if (hlPeriods && Array.isArray(hlPeriods) && hlPeriods.length) {

    hlPeriods.forEach(period => {
      let start; // start date
      let end;
      let key; // Should be MM/DD/YYYY
      let desc; 
      let style;
      let first = true;
      if (Array.isArray(period)) {
        key = formatDate(period[0]);
        start = Date.parse(period[0]);
        end = Date.parse(period[1]);
        desc = period[2];
        style = period[3];
      }
      else {
        let periodStruct = period.split(',').map(value => value.trim());
        key = formatDate(periodStruct[0]);
        start = Date.parse(periodStruct[0]);
        end = Date.parse(periodStruct[1]);
        desc = periodStruct[2];
        style = periodStruct[3];
      }

      while (start <= end) {
        if(first) {
          first = false;
          style += ',hlFirst';
        } 

        let highlightedDate = {
          key: key,
          timestamp: start,
          desc: desc,
          style: style,
        }

        let startDate = new Date(start);
        start = startDate.setDate(startDate.getDate() + 1);
        let nextDate = new Date(start);
        key = formatDate((nextDate.getMonth() + 1) + '/' + nextDate.getDate() + '/' + nextDate.getFullYear());

        let existingDate = dates.find(date => date.key === highlightedDate.key);
        if(existingDate !== undefined) {

          let hasDescription = existingDate.desc && existingDate.desc.length;
          let hasAlsoDescritpion = highlightedDate.desc && highlightedDate.desc.length;

          if(hasDescription && hasAlsoDescritpion) {
            existingDate.desc += "\n" + highlightedDate.desc;
          }
        } else {
          dates.push(highlightedDate);
        }
        
        style = style.split(',')[0];
        if(start === end){
          style += ',hlEnd';
        }
      }
    });
    return dates;
  }
}

/**
 * Makes sure date format is minimum 2 integer digits
 * @param {string} dateString - 
 * @returns {string}          - formatted date string as MM/DD/YYYY
 */
const formatDate = (string) => {
  return string 
          .split('/')
          .map(number => {
              return Number(number).toLocaleString('en-EN', { minimumIntegerDigits: 2, useGrouping: false })
            })
          .join('/');
}

/**
 * 
 * @param {string} formatString 
 * @returns {Object}
 */
export const identifyFormat = (formatString) => {
  if(!formatString) return undefined;

  let fstring = formatString.toLowerCase().split(' ');
  let dString = /[ymd]/.test(fstring[0]) ? fstring[0] : /[ymd]/.test(fstring[1]) ? fstring[1] : null;
  let tString = /[hi]/.test(fstring[0]) ? fstring[0] : /[hi]/.test(fstring[1]) ? fstring[1] : null;

  let y = (/y/).test(dString) ? dString.indexOf('y') : -1;
  let m = (/m/).test(dString) ? dString.indexOf('m') : -1;
  let d = (/d/).test(dString) ? dString.indexOf('d') : -1;
  let h = (/h/).test(tString) ? tString.indexOf('h') : -1;
  let i = (/i/).test(tString) ? tString.indexOf('i') : -1;

  let format = {
    date: Object.entries({y, m, d})
      .sort(([,a],[,b]) => a-b)
      .reduce((format, letter) => {
        if (letter[1] !== -1) {
          format.push(letter[0]);
        }
        return format;
      }, []),
    time: Object.entries({h, i})
      .sort(([,a],[,b]) => a-b)
      .reduce((format, letter) => {
        if (letter[1] !== -1) {
          format.push(letter[0]);
        }
        return format;
      }, []),
    dSeparator: '/',
    tSeparator: ':',
  };
  let dSep = dString.match(/[#%^*,.":|<>/\\]/);
  let tSep = tString.match(/[#%^*,.":|<>/\\]/);
  format.dSeparator = dSep ? dSep[0] : '';
  format.tSeparator = tSep ? tSep[0] : '';

  return format;
}

/**
 * Convert selected date string to formatted one
 * @param {string} string - Date string to be converted
 * @param {Format} format - Fornat
 * @returns {string}      - Newly formatted date string
 */
export const formatToDate = (string, format) => {
  let date = {
    year: string.getFullYear(),
    month: string.getMonth() + 1,
    day: string.getDate(),
  }

  let dateString = [];
  format.date.forEach(letter => {
    switch (letter) {
      case 'd': dateString.push(date.day); break;
      case 'm': dateString.push(date.month); break;
      case 'y': dateString.push(date.year); break;
      default: break;
    }
  })
  return `${dateString[0]}${format.dSeparator}${dateString[1]}${format.dSeparator}${dateString[2]}`;
}

/**
 * Convert selected time string to formatted one
 * @param {String} string - Time string to be converted
 * @param {Format} format - Format 
 * @returns {String}      - Newly formatted time string
 */
export const formatToTime = (string, format) => {
  let time = {
    hour: string.split(':')[0],
    minute: string.split(':')[1],
  }

  let dateString = [];
  format.time.forEach(letter => {
    switch (letter) {
      case 'h': dateString.push(time.hour); break;
      case 'i': dateString.push(time.minute); break;
      default: break;
    }
  })
  return `${dateString[0]}${dateString[1] ? format.tSeparator + dateString[1] : ''}`;
}

/**
 * Calculates Week Number 
 * @param {Date} currentDate - Which date
 * @returns {Number}         - Integer, Week Number
 */
export const getCurrentWeek = (currentDate) => {
  let startDate = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
   
  return Math.ceil(days / 7);
}

export const inputMask = (value) => {
  let maskedValue = value;

  // if(e.keyCode < 47 || e.keyCode > 57) {
  //   // e.preventDefault();
  // }
  
  let length = maskedValue.length;
  // if(len !== 1 || len !== 3) {
  //   if(e.keyCode === 47) {
  //     // e.preventDefault();
  //   }
  // }

  switch (length) {
    case 2: maskedValue += '/'; break;
    case 5: maskedValue += '/'; break;
    case 10: maskedValue += ' '; break;
    case 12: maskedValue += ':'; break;
    default: break;
  }
  return maskedValue;
}

/**
 * @typedef {Object} Format
 * @property {Array.<string>} date  - Format order, ex: ['y','d','m']
 * @property {Array.<string>} time  - Format order, ex: ['h','i']
 * @property {String} dSeparator    - Format separator for date, default '/'
 * @property {String} tSeparator    - Format separator for time, default ':' 
 */

/**
 * @typedef {Object} HighlightedDate
 * @property {String} desc      - Description set in title attribute
 * @property {String} key       - Highlighted Date in MM/DD/YYYY format
 * @property {String} className - Custom CSS class, use a default one if left empty
 * @property {String} timestamp - Highlighted Date as timestamp in ms
 */