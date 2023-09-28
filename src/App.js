import { Route,Routes,Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/authHook";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  const {user}=useAuthContext();
  return (
    <div className="App">
      <Navbar />
      <div className="pages">
        <Routes>
          <Route  path="/"  element={user?<Home />: <Navigate to={"/login"}/>} />
          <Route  path="/login"  element={user?<Navigate to={"/"}/>:<Login />} />
          <Route  path="/signup"  element={user?<Navigate to={"/"}/>:<Signup />} />
        </Routes>
      </div>
    
  </div>
  );
}

export default App;
