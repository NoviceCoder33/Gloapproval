import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login';
import Register from './register';
import Homepage from './homepage';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
     <Route exact path="/" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/homepage" element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
