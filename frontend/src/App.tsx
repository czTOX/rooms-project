import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MyRoomsPage from './pages/MyRoomsPage';
import NewRoomPage from './pages/NewRoomPage';
import RegistrationPage from './pages/RegistrationPage';
import RoomDetailPage from './pages/RoomDetailPage';
import RoomsPage from './pages/RoomsPage';
import OfferRoom from './pages/OfferRoom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function App() {

  return (
    <>
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<RoomsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/my-rooms" element={<MyRoomsPage />} />
          <Route path="/my-rooms/:id" element={<OfferRoom />} />
          <Route path="/rooms">
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/rooms/new" element={<NewRoomPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
