import React, { useEffect, useState } from 'react';
import styles from './style/mapModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useDidMountEffect from './hooks/useDidMountEffect';

declare global {
  interface Window {
    kakao: any;
  }
}

const MapModal = ({ closeModal, setAddr }: any) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  useDidMountEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {
      window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: any) {
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(
            mouseEvent.latLng.getLng(),
            mouseEvent.latLng.getLat(),
            (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                var addr = !!result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;

                // 클릭한 위치 주소를 가져온다.
                console.log(addr);

                setAddr(addr);

                // 기존 마커를 제거하고 새로운 마커를 넣는다.
                marker.setMap(null);
                // 마커를 클릭한 위치에 표시합니다
                marker.setPosition(mouseEvent.latLng);
                marker.setMap(map);
              }
            }
          );
        }
      );
    });
  }, [map]);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보 x'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const getPosSuccess = (pos: GeolocationPosition) => {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );

    map.panTo(currentPos);

    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

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
        <div id='map' className={styles.mapSection}></div>
        <button onClick={getCurrentPosBtn}>현재위치</button>
      </div>
    </>
  );
};

export default MapModal;
