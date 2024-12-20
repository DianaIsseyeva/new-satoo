import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Cabinet } from './Cabinet';
import { LoginPage } from './LoginPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/cabinet' element={<Cabinet />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
