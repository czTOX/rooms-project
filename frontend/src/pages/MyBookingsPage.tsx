import { FC } from 'react';
import RoomDetailView from '../components/RoomDetailView';


const MyBookingsPage: FC = () => {
  const activeBookings: any[] = ['x'];
  const historyBookings: any[] = ['x'];
  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">My bookings</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="rooms">
        {activeBookings.map(() => <RoomDetailView />)}
      </div>
      <div className="bookings-history">
        <h2 className='text-semibold'>History</h2>
        <div className="content-divider"></div>
        <div className="rooms">
          {historyBookings.map(() => <RoomDetailView />)}
        </div>
      </div>
    </>
  );
}

export default MyBookingsPage;