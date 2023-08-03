![JAVASCRIPT](./src/assets/badges/javascript.svg)
![REACT](./src/assets/badges/react.svg)
<br>
![node.js](https://img.shields.io/badge/node.js-v16.16.0-green?style=for-the-badge&logo=nodedotjs)
![react](https://img.shields.io/badge/react-18.2.0-18a7d6?style=for-the-badge&logo=react)
<br>

---

### 1. General information

The project is about a new start-up bank, **HRNet**, which is trying to break into the industry and needs help setting up its app. We obtained a two-part contract which is broken down into a couple phases:

### 2. Getting Started with this repository

1. Clone the repository:

   ```sh
   git clone https://github.com/KevinLeFaucheur/project-13-bank-front
   ```

2. Change the current working directory to the cloned project location:

   ```sh
   cd hrnet-react
   ```

3. Install NPM packages:
   ```sh
   npm install
   ```

4. Runs the app in the development mode:
   ```sh
   npm start
   ```

### 3. Setup the Datepicker in your project


```JSX
  <DatePicker 
    id='start'
    onChange={(value) => setStartValue(value)} 
  />
```

### 4. Using the options props

## 4.1 Adding the Timepicker option

```JSX
  <DatePicker options={{ timepicker: true }} />
```

## 4.2 Adding the save selected button

By default, Datepicker 

```JSX
  <DatePicker options={{  }} />
```

## 4.3 Choosing the localization for this Datepicker

By default, Datepicker reads the lang attribute of the html tag.
To override this you can set the desired one:

```JSX
  <DatePicker options={{ locale: 'fr' }} />
```

## 4.4 Highlighting a specific single dates, with own title and CSS

```JSX
  <DatePicker options={{ 
  highlightedDates: [
    '06/30/2023, Test',
    '07/2/2023, Birthday',
    '07/18/2023, Another Test, hlCyan',
  ] }} />
```

## 4.5 Highlighting a specific period of consecutive dates, with own title and CSS

```JSX
  <DatePicker options={{  
    highlightedPeriods: [
      '06/1/2023, 06/18/2023, holidays, hlGreen',
      '07/1/2023, 07/8/2023, practice, hlGreen',
      ['12/1/2023', '12/18/2023', 'winter', 'hlCyanPlain']
    ] }} />
```

## 4.6 Overlapping highlighted dates and periods is possible


## 4.7 Adding 

```JSX
  <DatePicker
    options={{ }}
  />
```

## 4.8 Adding 

```JSX
  <DatePicker
    options={{ }}
  />
```

### 5. Adding your custom CSS

## 5.1. To the overall visual of the component



## 5.2. Adding classes to the highlighted days and periods

