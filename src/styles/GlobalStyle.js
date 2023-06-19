import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
  }

  body, #root {
    /* margin: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh; */
  }

  .main {
    /* flex: 1; */
  }
  
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  label {
      display: block;
      margin-top: 1rem;
      margin-bottom: 10px;
  }

  .address {
      margin-top: 10px;
  }

  select {
    &#state, &#department {
      border: 1px solid #c5c5c5;
      border-radius: 3px;
      padding: 0.4em 1em;
      background: #f6f6f6;
      color: #454545;
    }
  }

  #create-employee {
    width: 300px;

    input {
      /* width: 100%; */
    }
  }

  #confirmation {
  }
`