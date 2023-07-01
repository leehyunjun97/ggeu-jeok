import React, { useEffect, useState, useRef } from 'react';
import styles from './style/mapModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useDidMountEffect from './hooks/useDidMountEffect';
import { Map, MapMarker } from 'react-kakao-maps-sdk';


const MapModal = ({ closeModal, setAddr }: any) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    ispanTo: false,
  });

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMap((prev: any) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
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
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMap((prev: any) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, [map.ispanTo]);

  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.titleSection}>
          <h4>지도</h4>
        </section>
        <Map
          ref={mapRef}
          isPanto={map.ispanTo}
          className={styles.mapSection}
          center={{ lat: map?.center?.lat, lng: map?.center?.lng }}
        >
          <MapMarker
            position={{ lat: map?.center?.lat, lng: map?.center?.lng }}
          >
            <div style={{ color: '#000' }}>Hello World!</div>
          </MapMarker>
        </Map>

        <button
          onClick={() => {
            const map = mapRef.current;
            console.log(map);

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
          현재위치
        </button>
      </div>
    </>
  );
};

export default MapModal;
