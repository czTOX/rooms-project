import { FC } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RoomsApi } from '../services';
import Offer from '../components/Offer';
import { Carousel } from 'react-responsive-carousel';

const RoomDetailPage: FC = () => {
  const { id } = useParams();

  const { data: room } = useQuery({
    queryKey: ['getRoomOffers', id],
    queryFn: () => RoomsApi.getRoomOffers(id!),
    enabled: !!id,
  });

  return (
    <>
      <div className="header-container">
        <header>
          <h1 className="text-semibold">{room?.data.caption}</h1>
          <div className="page-header__divider"></div>
        </header>
      </div>
      <div className="room-content">
        <div className="room-carousel">
          <Carousel
            showArrows={true}
            swipeable={true}
            showStatus={false}
            dynamicHeight={false}
          >
            {room?.data.photosUrls.split(';').map((url) => {
              return (
                <div>
                  <img src={url} alt={`photo-${url}`} />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="room-info">
          <div className="room-info__basic">
            <span className="room-info__desc text-regular">
              {room?.data.description}
            </span>
            <span className="room-info__location text-regular">
              {room?.data.location.city + ', ' + room?.data.location.street}
            </span>
            <span className="room-info__price text-regular">
              Price per night: <strong>{room?.data.pricePerNight} Kč</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="room-offers">
        {room?.data.offers.map((offer, index) => (
          <Offer key={`offer-${index}`} {...offer} />
        ))}
      </div>
    </>
  );
};

export default RoomDetailPage;
