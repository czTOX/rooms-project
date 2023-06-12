import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';


const RoomDetailCarousel: FC = () => {
  return (
    <Carousel showArrows={true} swipeable={true} showStatus={false}>
      <div>
        <img src="assets/room-example.jpg" />
      </div>
      <div>
        <img src="assets/room-example.jpg" />
      </div>
    </Carousel>
  );
}

export default RoomDetailCarousel;