import React, { useEffect, useState, useRef } from 'react';
import styles from './style/mapModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Portal from '../Portal/Portal';
import Button from '../../Button/Button';
import Title from '../../Heading/Title';

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

const MapModal = ({ closeModal, addr, setAddr }: any) => {
  const mapRef = useRef<any>(null);
  const [position, setPosition] = useState<any>(null);
  const [map, setMap] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    ispanTo: false,
  });

  const geocoder = new window.kakao.maps.services.Geocoder();

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMap((prev: any) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setMap((prev: any) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      setMap((prev: any) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  };

  const transAddr = (lng: any, lat: any) => {
    geocoder.coord2Address(lng, lat, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const addr = !!result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;

        console.log(addr);
        setAddr(addr);
      }
    });
  };

  useEffect(() => {
    getCurrentPosition();
  }, [map.ispanTo]);

  return (
    <Portal
      id='modal'
      children={
        <>
          <div className={styles.modalBackground} onClick={closeModal}></div>
          <div className={styles.modalSection}>
            <Button.CloseButton onClick={closeModal} />
            <section className={styles.titleSection}>
              <Title text={'지도'} />
            </section>
            <section className={styles.searchSection}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  marginRight: '15px',
                  opacity: '0.7',
                  cursor: 'pointer',
                }}
              />
              <input type='text' value={addr} readOnly />
            </section>
            <Map
              ref={mapRef}
              isPanto={map.ispanTo}
              className={styles.mapSection}
              center={{ lat: map?.center?.lat, lng: map?.center?.lng }}
              onClick={(_t, mouseEvent) => {
                setPosition({
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                });
                transAddr(
                  mouseEvent.latLng.getLng(),
                  mouseEvent.latLng.getLat()
                );
              }}
            >
              {position && <MapMarker position={position} />}
            </Map>

            <button
              className={styles.currentBtn}
              onClick={() => {
                const map = mapRef.current;

                setMap((prev) => ({
                  ...prev,
                  center: {
                    lat: 0,
                    lng: 0,
                  },
                }));
                getCurrentPosition();
              }}
            >
              현위치
            </button>
          </div>
        </>
      }
    />
  );
};

export default MapModal;
