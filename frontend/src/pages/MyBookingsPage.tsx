import { FC } from 'react';
import RoomDetailView from '../components/RoomDetailView';
import { UsersApi } from '../services';
import { useQuery } from '@tanstack/react-query';

const MyBookingsPage: FC = () => {
  const { data: activeBookings } = useQuery({
    queryKey: ['getBookings'],
    queryFn: () => UsersApi.getBookings(),
  });

  const { data: historyBookings } = useQuery({
    queryKey: ['getBookingsHistory'],
    queryFn: () => UsersApi.getBookingsHistory(),
  });

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">My bookings</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="rooms">
        {activeBookings?.data.bookings.map((booking) => (
          <RoomDetailView key={booking.id} {...booking} />
        ))}
      </div>
      <div className="bookins-history">
        <h2 className="text-semibold">History</h2>
        <div className="content-divider"></div>
        <div className="rooms">
          {historyBookings?.data.bookings.map((booking) => (
            <RoomDetailView key={booking.id} {...booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBookingsPage;
