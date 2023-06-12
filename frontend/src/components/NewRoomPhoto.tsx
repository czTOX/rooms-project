import { FC } from 'react';


const NewRoomPhoto: FC = () => {
  return (
    <>
      <img src="./assets/room-example.jpg" alt="photo1" className='new-room__photo-preview' />
      <img src="assets/room-example.jpg" alt="photo2" className='new-room__photo-preview' />
      <img src="assets/room-example.jpg" alt="photo3" className='new-room__photo-preview' />
    </>
  );
}

export default NewRoomPhoto;