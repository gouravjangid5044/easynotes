import './App.css';
import Navbar from './components/Navbar';
import About from './components/about';
import{
  BrowserRouter,
  Route,
  Routes
}
from "react-router-dom"
import NoteState from './context/notes/NoteState';
import Home from './components/home'
import Signup from './components/signup';
function App() {
  // const getStoredToken=()=>{
  //   const cookieString = document.cookie;
  //   const cookies = cookieString.split('; ')
  //   for (const cookie of cookies) {
  //     const [name, value] = cookie.split('=')
  //     if (name === 'token') {
  //       return value;
  //     }
  //   }
  //   return null;
  // }
  // useEffect(()=>{
  //   console.log(getStoredToken())
  // },[getStoredToken])
  return (
    <>
   <NoteState>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<><Home></Home></>}></Route>
         <Route path="/about" element={<><About page={"About"}></About></>}></Route>
         <Route path="/signup" element={<><Signup></Signup></>}></Route>
       </Routes>
    </BrowserRouter>
   </NoteState>
   </>
  );
}

export default App;
