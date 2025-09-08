import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Trains from "./pages/Trains.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white-900 text-white relative overflow-hidden">
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/trains' element={<Trains/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
