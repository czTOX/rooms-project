import React from "react";
import { useRecoilState } from "recoil";
import { logedInAtom } from './state/atoms';
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyRoomsPage from "./pages/MyRoomsPage";
import NewRoomPage from "./pages/NewRoomPage";
import RegistrationPage from "./pages/RegistrationPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import RoomsPage from "./pages/RoomsPage";

export default function App() {
  const [logedIn, setLogedIn] = useRecoilState(logedInAtom);

  return (
    <>
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/" element={<RoomsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/my-rooms" element={<MyRoomsPage />} />
          <Route path="/rooms">
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/rooms/new-room" element={<NewRoomPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
