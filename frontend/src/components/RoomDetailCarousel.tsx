import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';


const RoomDetailCarousel: FC<string> = (photosUrls: string) => {
  return (
    <Carousel showArrows={true} swipeable={true} showStatus={false} dynamicHeight={false}>
      {photosUrls.split(';').map((url) => {
        return (
          <div>
            <img src={url} alt={`photo-${url}`} />
          </div>
        )
      })}
    </Carousel>
  );
}

export default RoomDetailCarousel;