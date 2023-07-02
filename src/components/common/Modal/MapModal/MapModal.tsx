import React, { useEffect, useState, useRef } from 'react';
import styles from './style/mapModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          // transAddr(position.coords.longitude, position.coords.latitude);
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

  // const onClickAddr = () => {
  //   // 3) 주소 검색
  //   new window.daum.Postcode({
  //     // 4) 검색된 주소 클릭 시 콜백 함수
  //     oncomplete: function (addrData: any) {
  //       var geocoder = new window.kakao.maps.services.Geocoder();
  //       geocoder.addressSearch(
  //         addrData.address, // 검색된 주소
  //         function (result: any, status: any) {
  //           // 5) 성공시 좌표 값을 가져온다.
  //           if (status === window.kakao.maps.services.Status.OK) {
  //             var currentPos = new window.kakao.maps.LatLng(
  //               result[0].y,
  //               result[0].x
  //             );
  //             (document.getElementById('addr') as HTMLInputElement).value =
  //               addrData.address;

  //             setPosition(currentPos);
  //           }
  //         }
  //       );
  //     },
  //   }).open();
  // };

  const transAddr = (lng: any, lat: any) => {
    geocoder.coord2Address(lng, lat, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const addr = !!result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;

        // 클릭한 위치 주소를 가져온다.
        console.log(addr);
        setAddr(addr);
      }
    });
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
        <section className={styles.searchSection}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: '15px', opacity: '0.7', cursor: 'pointer' }}
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
            transAddr(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat());
          }}
        >
          {position && <MapMarker position={position} />}
        </Map>

        <button
          className={styles.currentBtn}
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
          현위치
        </button>
      </div>
    </>
  );
};

export default MapModal;
