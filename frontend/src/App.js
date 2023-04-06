import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login';
import Register from './register';
import Homepage from './homepage';
import CreateReimbursement from "./CreateReimbursement";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
     <Route exact path="/" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>

     <Route path="/create" element={<CreateReimbursement/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
