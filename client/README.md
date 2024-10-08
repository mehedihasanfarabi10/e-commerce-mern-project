# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


react app create => vite react/nextjs

npm create vite@latest

npm install
npm run dev

react holo SPA=> single page application

react er first index.html e sob page,user,product load korano hoy
index.html use hou main.jsx file e root hisebe

App.jsx is a component

/*
    App.jsx first all code=>

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


*/

All components first letter is Capital letter
Components return jsx
jsx=> html + javascript 

jodi vite create er por ei somossa dekha jay (> client@0.0.0 dev
> vite

'vite' is not recognized as an internal or external command,
operable program or batch file.)
then=> npm i vite
dite hobe

component multiple time use kora jay

React Features=> virtual dom => document.getElementById() these auto imported in this virtual DOM

akti component kebol akti div return korte pare ai div er vitore multiple tag diye sajano jabe\
return(
  <div>
  <h2>Hello</h2>
  <h2>Hello</h2>
  <h2>Hello</h2>
  </div>
)

2. npm i react-router-dom

    "eslint": "^8.57.0",

    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",

index.jsx file hole seta folder import holei hoy file import not needed => but otherwise needed

page title set up=> react-helmet npm

data fetch korar somy jeno sob component data fetch korte pare ba update o korte pare sedike kheyal rakhte hobe must be
for this=> data ke state management dara use krbo

npm install @reduxjs/toolkit

reducers logical part niye kaj kore

reducer accessed=>store
store is a data source where always shows updated data

store accessed by react app

jodi kono update kora lage then react app reducer logic er dara update kore

1.slice ready 2. slice connect to store
3. store connect to main.jsx

npm install react-redux

React.Restric replaced by <Provider store={store}> that is from "react-redux"

useSelector comes from react-redux
action=>disPatch = useDispatch



