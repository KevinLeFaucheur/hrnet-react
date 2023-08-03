![JAVASCRIPT](./src/assets/badges/javascript.svg)
![REACT](./src/assets/badges/react.svg)
<br>
![node.js](https://img.shields.io/badge/node.js-v16.16.0-green?style=for-the-badge&logo=nodedotjs)
![react](https://img.shields.io/badge/react-18.2.0-18a7d6?style=for-the-badge&logo=react)
![react-router](https://img.shields.io/badge/react%20router-6.10.0-red?style=for-the-badge&logo=reactrouter)
<br>

---

### 1. General information

![Wealth Health](./src/assets/logo.jpg)

**Wealth Health** use an employee managing application called **HRNet**, which has been using jQuery on its front end. This project aims to convert the whole HRNet app to React without any jQuery left. Including converting the plugins for less dependency and more control over their internal use of the application.


### 2. Getting Started with this repository

## 2.1 Launching the front-end development project HRNet

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

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## 2.2 Building and launching the front-end build of HRNet

1. Builds the app into the build folder:
   ```sh
   npm build
   ```

2. Change the current working directory to the build location:

   ```sh
   cd build
   ```

3. Runs the app in the development mode:
   ```sh
   npm start
   ```

### Changing the front-end port

In `package.json` , in the `"scripts"` field, change port number in this line:<br>
`"start": "set PORT=3000 && react-scripts start",`
