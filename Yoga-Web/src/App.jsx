import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import OfferingsPage from './pages/OfferingsPage'
import About from './pages/About'
import Contact from "./pages/Contact";
import RazorpayButton from "./pages/RazorpayButton";
import Section from "./pages/Section";
import Technologies from "./pages/Technologies";
function App() {
  
   
  return (
    <>
       <Router>
      <Routes>
        {/* Route for Home */}
        <Route path="/" element={<Home />} />

        {/* Example second route */}
        <Route path="/about" element={<About/>} />
        <Route path="/offerings" element={<OfferingsPage/>}/>
        

        {/* Example third route */}
        <Route path="/contact" element={<Contact/>} />
        <Route path="/sessions" element={<Section/>} />
        <Route path="/technologies" element={<Technologies/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
