// import Home from './screens/Home';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Reset from './components/forms/Reset';

const routes = [
  { title: "Login", path: "/Login", element: Login, isNav: true },
  { title: "Register", path: "/Register", element: Register, isNav: true },
  { title: "Reset", path: "/Reset", element: Reset, isNav: false },
  // { title: "Home", path: "/", element: Home, isNav: true }, 
]
export default routes