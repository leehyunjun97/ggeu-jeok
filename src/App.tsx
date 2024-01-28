import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import UserRouter from './router/UserRouter';
import Main from './pages/Main';
import Header from './components/header/Header';
import NonUserRouter from './router/NonUserRouter';
import Signup from './pages/signup/Signup';
import ScheduleRouter from './router/ScheduleRouter';
import CreateRoom from './pages/schedule/CreateRoom/CreateRoom';
import RoomMain from './pages/schedule/Room/RoomMain';
import DetailSchedule from './pages/schedule/DetailRoom/DetailSchedule';
import NoMatchRouter from './router/NoMatchRouter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main' element={<NonUserRouter />}>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route path='/' element={<UserRouter />}>
          <Route path='/' element={<Header />}>
            <Route path='main' element={<Main />} />
            <Route path='/schedule/create' element={<CreateRoom />} />
            <Route path='schedule' element={<ScheduleRouter />}>
              <Route path='/schedule/:nickName/:id' element={<RoomMain />} />
              <Route
                path='/schedule/:nickName/:id/:date'
                element={<DetailSchedule />}
              />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<NoMatchRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
