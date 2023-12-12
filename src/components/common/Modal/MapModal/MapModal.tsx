import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './style/mapModal.module.css';
import Title from '../../Heading/Title';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Input from '../../Input/Input';
import Toast from '../../Toast/Toast';

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface IMapProps {
  closeModal: () => void;
  setAddr: (location: string) => void;
}

const MapTest = ({ closeModal, setAddr }: IMapProps) => {
  const [info, setInfo] = useState<Marker | undefined>();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map | undefined>();
  const [mapSearch, setMapSearch] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [toastText, setToastText] = useState('');
  const [visible, setVisible] = useState(false);

  const geocoder = new window.kakao.maps.services.Geocoder();

  const mapSearchHandler = () => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(mapSearch, (data, status, _pagination) => {
      if (!!!data.length) {
        setToastText('위치를 찾을 수 없습니다.');
        setVisible(!visible);
      }

      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers: Marker[] = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: Number(data[i].y),
              lng: Number(data[i].x),
            },
            content: data[i].place_name,
          });
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x))
          );
        }
        setMarkers(markers);

        map.setBounds(bounds);
      }
    });
  };

  const markerHandler = (mouseEvent: kakao.maps.event.MouseEvent) => {
    geocoder.coord2Address(
      mouseEvent.latLng.getLng(),
      mouseEvent.latLng.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          setMarkers((prev) => [
            ...prev,
            {
              position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
              content: addr,
            },
          ]);
        }
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <Button.CloseButton onClick={closeModal} />
        <section className={styles.titleSection}>
          <Title text={'지도'} />
        </section>
        <section className={styles.searchSection}>
          <Input
            placeholder='지도를 클릭하거나 검색해주세요'
            style={{ width: '70%' }}
            type='text'
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
          />
          <Button.ActiveButton
            onClick={mapSearchHandler}
            text={'찾기'}
            style={{
              width: '15%',
              marginTop: '5px',
              height: '72%',
              backgroundColor: '#bb9d75',
            }}
          />
        </section>
        <Map
          center={{
            lat: currentLocation?.lat || 0,
            lng: currentLocation?.lng || 0,
          }}
          style={{
            width: '100%',
            height: '350px',
          }}
          level={3}
          onCreate={setMap}
          onClick={(_t, mouseEvent) => {
            markerHandler(mouseEvent);
          }}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <Button
                  text={marker.content}
                  onClick={() => {
                    setAddr(marker.content);
                    closeModal();
                  }}
                  style={{
                    width: 'max-content',
                    backgroundColor: '#c8a2c8',
                    padding: '3px',
                  }}
                />
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
    </>
  );
};
export default MapTest;
