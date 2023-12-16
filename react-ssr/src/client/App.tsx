import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import About from "./components/About";
import { Routes, Route } from "react-router-dom";

function App(){

    return(
       <main>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Counter/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
       </main>
    );
}

export default App;