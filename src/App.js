import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Header from './component/modules/Header';
import Home from './component/modules/Home';
import Contact from './component/modules/Contact';
 import Leave from './component/modules/Leave';
 import Shift from './component/modules/Shift';
 import Profile from './component/modules/Profile';
 import Dashboard from './component/modules/Dashboard';

 import Login from './component/validation/Login';
 import Signup from './component/validation/Signup';
 import Approval from './component/validation/Approval';
 import Attandance from './component/modules/Attandance';
 import About from './component/About';
 import Department from './component/modules/Department'
 import UpcomingBirthday from './component/modules/UpcomingBirthday';
 import VideoHome from '../src/component/modules/videocall/VideoHome';
 import VideoRoom from '../src/component/modules/videocall/VideoRoom';

 import PrivateComponent from './component/validation/PrivateComponent'






function App() {
  return (
    <div className="App">
    <BrowserRouter>
    
    <Header/>
    <ToastContainer />
     <Routes>
       <Route element={<PrivateComponent/>}>
       <Route path='leave' element={<Leave/>}/>
       <Route path='shift' element={<Shift/>}/>
       <Route path='/contact' element={<Contact/>}></Route>
       <Route path='/profile' element={<Profile/>}></Route>
       <Route  path='/approval' element={<Approval/>}></Route>
       <Route  path='/dashboard' element={<Dashboard/>}></Route>
       <Route  path='/attandance' element={<Attandance/>}></Route>
       <Route  path='/about' element={<About/>}></Route>
       <Route  path='/department' element={<Department/>}></Route>
       <Route  path='/birthday' element={<UpcomingBirthday/>}></Route>
       <Route path='/videoHome' element={<VideoHome/>}/>
           <Route path='/videoRoom/:roomId' element={<VideoRoom/>}/>
       </Route>
       <Route path='/' element={<Home/>}></Route>

       <Route  path='/login' element={<Login/>}></Route>
       <Route  path='/signup' element={<Signup/>}></Route>
     </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
