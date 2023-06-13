import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';


const RoomDetailCarousel: FC = () => {
  return (
    <Carousel showArrows={true} swipeable={true} showStatus={false} dynamicHeight={false}>
      <div>
        <img src="https://picsum.photos/900/600" />
      </div>
      <div>
        <img src="https://picsum.photos/900/600" />
      </div>
    </Carousel>
  );
}

export default RoomDetailCarousel;