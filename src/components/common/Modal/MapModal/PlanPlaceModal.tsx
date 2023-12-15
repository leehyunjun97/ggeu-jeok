import React, { useEffect, useState } from 'react';
import styles from './style/mapModal.module.css';
import Button from '../../Button/Button';
import Title from '../../Heading/Title';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../../recoil/room/roomInfo';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Marker } from '../../../../types/map';

interface IMapProps {
  closeModal: () => void;
}

const PlanPlaceModal = ({ closeModal }: IMapProps) => {
  const room = useRecoilValue(roomInfo);

  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <Button.CloseButton onClick={closeModal} />
        <section className={styles.titleSection}>
          <Title text={'모임 장소'} />
        </section>
        <Map
          className={styles.map}
          center={{
            lat: room.location.lat,
            lng: room.location.lng,
          }}
          level={1}
        >
          <MapMarker
            position={{ lat: room.location.lat, lng: room.location.lng }}
          >
            <div className={styles.placeName}>{room.location.placeName}</div>
          </MapMarker>
        </Map>
      </div>
    </>
  );
};

export default PlanPlaceModal;
