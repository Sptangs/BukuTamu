  import { useState } from 'react'
  import './App.css'

  import Header from "./components/Header";
  import Footer from "./components/foter";
  import Home from "./components/home";
  import SideNav from "./components/sideNav";
  import BukuTamu from './components/table';


  function App() {
    const [count, setCount] = useState(0)

    return (
      <div className='wrapper'>
      <BukuTamu></BukuTamu>
      <Header></Header>
      <Footer></Footer>
      <Home></Home>
      <SideNav></SideNav>
    </div>
  );
  }

  export default App
