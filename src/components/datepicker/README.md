
![JAVASCRIPT](badges/javascript.svg) ![REACT](badges/react.svg)</br>
![node.js](https://img.shields.io/badge/node.js-v16.16.0-green?style=for-the-badge&logo=nodedotjs) ![react](https://img.shields.io/badge/react-18.2.0-18a7d6?style=for-the-badge&logo=react)

---
## I - Usage and information

### 1. General information

This project is the conversion of a jQuery plugin datetimepicker into React component.
The component can be installed as a **npm package** for a React application.

### 2. Getting Started with this repository

1. Clone the repository:

```sh

   git clone https://github.com/KevinLeFaucheur/datetimepicker-react.git

```

2. Change the current working directory to the cloned project location:

```sh

   cd datetimepicker-react

```

3. Install NPM packages:

```sh

   npm i

```

4. Runs the app in the development mode:

```sh

   npm start

```

---
## II - Install and use the DateTimePicker component

#### 1. NPM

```sh
   npm install --save datepicker-p14
```

#### 2. Import

```js
   import DatePicker from 'datepicker-p14';
   import "datepicker-p14/dist/index.css";
```

#### 3. JSX. 

```jsx
   <DatePicker id='start-date' />
```

#### 4. Getting the value. 

```jsx
   const [value, setValue] = useState();

 [...]
 
   <DatePicker onChange={(value) => setValue(value)} />
```

## II - Examples

#### 1. Locale Example

```JSX
   <DatePicker options={ locale: 'fr' } />
```

#### 2. Only TimePicker Example

```JSX
   <DatePicker options={ timepicker: true, datepicker: false } />
```

#### 3. Inline DatePicker Example

```JSX
   <DatePicker options={ inline: true } />
```

#### 4. allowTimes options TimePicker Example

```JSX
   <DatePicker options={ timepicker: true, allowTimes: ['06:00','12:00','18:00'] } />
```

#### 5. handler onChangeDateTime Example

```JSX
   <DatePicker options={ onChangeDateTime: () => { } } />
```

#### 6. minDate and maxDate Example

```JSX
   <DatePicker options={ minDate: '08/01/2023', maxDate: '08/31/2023' } />
```

#### 7. Dark Theme Example

```JSX
   <DatePicker options={ theme: 'dark' } />
```

#### 8. Highlighted Date Example

```JSX
   highlightedPeriods: ['date, description, className'] } 
```

```JSX
   <DatePicker options={ highlightedDates: ['08/25/2023, Birthday, hlCyan'] } />
```

#### 9. Highlighted Period Example


```JSX
   highlightedPeriods: ['startdate, endDate, description, className'] } 
```

```JSX
   <DatePicker options={ 
			highlightedPeriods: ['09/01/2023, 09/30/2023, Practice, hlGreen'] } 
/>
```

#### 10. 

```JSX
   <DatePicker />
```


## III - Full options list

| Option Name | Default value | Description | Example            |
| ------------- | -------- | -------- | ----------------------------- |
|locale         |Language i18n | See table at the bottom | ```{ locale: 'fr' }``` |
|format         |y/m/d h:i |Format date| ```{ format: 'y.d.m' }```  |
|step           |60         |timepicker steps, 0 < step <= 60 | ```{ step: 30 }```  |
|closeOnDateSelect |false |Close picker when choosing a date | ```{ closeOnDateSelect: true }``` |
|validateOnBlur |true | | ```{ validateOnBlur: false }```  |
|timepicker     |false |Enable time picking | ```{ timepicker: true }``` |
|datepicker     |true |Enable date picking  | ```{ datepicker: false }``` |
|weeks          |false |Show week number, left side of calendar | ```{ weeks: true }``` |
|theme          |'' |className for alternate color theme, **dark** is supported | ```{ theme: 'dark' }```  |
|minDate        |false |Minimum date enabled to pick | ```{ minDate: 0 }``` <br> ```{ minDate: '08/15/2023' }```<br> ```{ minDate: new Date() }``` |
|maxDate        |false |Maximum date enbaled to pick | ```{ maxDate: 0 }``` <br> ```{ maxDate: '08/15/2023' }```<br> ```{ maxDate: new Date() }``` |
|startDate      |false | | ```{ startDate: '08/15/2023' }``` |
|defaultDate    |false | | ```{ defaultDate: '08/15/2023' }``` |
|defaultTime    |false | | ```{ defaultTime: '08/15/2023' }``` |
|minTime        |false |Minimum time enabled to pick | ```{ minTime: 0 }``` <br> ```{ minTime: '06:00' }```<br> ```{ minTime: new Date() }``` |
|maxTime        |false |Maximum time enabled to pick | ```{ maxTime: 0 }``` <br> ```{ maxTime: '21:00' }```<br> ```{ maxTime: new Date() }```  |
|allowTimes     |[]    |Timepicker will only display these if set | ```{ allowTimes: ['06:00','12:00','18:00'] }```  |
|opened         |false |Picker is opened by default when true | ```{ opened: true }``` |
|inline         |false | | ```{ inline: true }``` |
|todayButton    |true  |Display **Today** button shortcut | ```{ todayButton: false }``` |
|timepickerScrollbar |true  |Display scroll bar for timepicker | ```{timepickerScrollbar: false }``` |
|onSelectDate        | | | ```{ onSelectDate: () => { console.log('onSelectDate') } }``` |
|onChangeMonth       | | | ```{ onChangeMonth: () => { console.log('onChangeMonth') } }``` |
|onChangeYear        | | | ```{ onChangeYear: () => { console.log('onChangeYear') } }``` |
|onChangeDateTime    | | | ```{ onChangeDateTime: () => { console.log('onChangeDateTime') } }``` |
|onShow              | | | ```{ onShow: () => { console.log('onShow') } }``` |
|onClose             | | | ```{ onClose: () => { console.log('onClose') } }``` |
|inverseButton       |false |Inverse month and time arrow buttons | ```{ inverseButton: true }``` |
|scrollMonth         |true |Enable mouse wheel for scrolling months | ```{ scrollMonth: false }``` |
|scrollInput         |true | | ```{ scrollInput: false }``` |
|hours12             |false | | ```{ hours12: true }``` |
|yearStart           |1950 |Start value for year select | ```{ yearStart: 1900 }``` |
|yearEnd             |2050 |End value for year select | ```{ yearEnd: 2100 }``` |
|weekends            |[] | | ```{ weekends: ['08/15/2023','08/16/2023','08/17/2023','08/18/2023'] }``` |
|disabledDates       |[] |Disable specific dates | ```{ disabledDates: ['08/15/2023','08/16/2023','08/17/2023','08/18/2023'] }``` |
|allowDates          |[] | | ```{ allowDates: ['08/15/2023','08/16/2023','08/17/2023','08/18/2023'] }``` |
|disabledWeekDays    |[]  |Disable week days by index, Sun = 0, Sat = 6 | ```{ disabledWeekDays: [0,1,2] }``` |

#### Language options

| Language i18n | 
| -------- | 
| **ar** - Arabic  |
| **az** - Azerbaijanian (Azeri)  |
| **bg** - Bulgarian  |
| **bs** - Bosanski  |
| **ca** - Català  |
| **ch** - Simplified Chinese   |
| **cs** - Čeština   |
| **da** - Dansk   |
| **de** - German   |
| **el** - Ελληνικά   |
| **en** - English   |
| **en-GB** - English (British)   |
| **es** - Spanish   |
| **et** - "Eesti"   |
| **eu** - Euskara   | 
| **fa** - Persian   |
| **fi** - Finnish (Suomi)   |
| **fr** - French   |
| **gl** - Galego   |
| **he** - Hebrew (עברית)   |
| **hr** - Hrvatski   |
| **hu** - Hungarian   |
| **id** - Indonesian   |
| **it** - Italian   |
| **ja** - Japanese   |
| **ko** - Korean (한국어)   |
| **kr** - Korean   |
| **lt** - Lithuanian (lietuvių)   |
| **lv** - Latvian (Latviešu)   |
| **mk** - Macedonian (Македонски)   |
| **mn** - Mongolian (Монгол)   |
| **nl** - Dutch   |
| **no** - Norwegian   |
| **pl** - Polish   |
| **pt** - Portuguese   |
| **pt-BR** - Português(Brasil)   |
| **ro** - Romanian   |
| **ru** - Russian   |
| **se** - Swedish   |
| **sk** - Slovenčina   |
| **sl** - Slovenščina   |
| **sq** - Albanian (Shqip)   |
| **sr** - Serbian Cyrillic (Српски)   |
| **sr-YU** - Serbian (Srpski)   |
| **sv** - Svenska   |
| **th** - Thai  |
| **tr** - Turkish  | 
| **uk** - Ukrainian  | 
| **vi** - Vietnamese  | 
| **zh** - Simplified Chinese (简体中文)  | 
| **zh-TW** - Traditional Chinese (繁體中文) | 

