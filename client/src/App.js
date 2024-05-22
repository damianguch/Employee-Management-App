import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './components/Signup';
import Login from './components/Login';
import './App.css';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/employee" element={<Employee />}></Route>
            <Route path="/create" element={<AddEmployee />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
