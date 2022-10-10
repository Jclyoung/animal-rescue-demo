import Home from './components/screens/Home';
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Reset from './components/forms/Reset';

const routes = [
  { title: "Home", path: "/", element: Home, isNav: true, isUser: true }, 
  { title: "Login", path: "/Login", element: Login, isNav: true, isUser: false },
  { title: "Register", path: "/Register", element: Register, isNav: true, isUser: false },
  { title: "Reset", path: "/Reset", element: Reset, isNav: false },
]
export default routes