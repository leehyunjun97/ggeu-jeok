import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import UserRouter from './router/UserRouter';
import Main from './pages/Main';
import Header from './components/header/Header';
import NonUserRouter from './router/NonUserRouter';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<NonUserRouter />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route path='/' element={<UserRouter />}>
          <Route path='/' element={<Header />}>
            <Route path='main' element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
