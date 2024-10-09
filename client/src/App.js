import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/Signup';
import Login from './components/Login';
import './App.css';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employees';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Profile from './components/Profile';
import { RequireToken } from './components/Auth';
import Navbar from './components/Navbar';
import { ModeToggler } from './components/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RequireToken>
                <Dashboard />
              </RequireToken>
            }>
            <Route path="" element={<Home />}></Route>
            <Route path="/employees" element={<Employee />}></Route>
            <Route path="/create" element={<AddEmployee />}></Route>
            <Route path="/edit-employee/:id" element={<EditEmployee />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/timer" element={<ModeToggler />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
