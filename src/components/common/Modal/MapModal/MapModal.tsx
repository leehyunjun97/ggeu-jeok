import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './style/mapModal.module.css';
import Title from '../../Heading/Title';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Input from '../../Input/Input';
import Toast from '../../Toast/Toast';
import { enterKeyDownHandler } from '../../../../utils/common/keyDown';
import {
  getPlaceNameFromCoordinates,
  mapKeywordSearchHandler,
} from '../../../../utils/map/map';
import { Marker } from '../../../../types/map';
import { ILocation } from '../../../../types/room';

interface IMapProps {
  closeModal: () => void;
  setAddr: (location: ILocation) => void;
}

const MapModal = ({ closeModal, setAddr }: IMapProps) => {
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

  const mapSearchHandler = async () => {
    try {
      if (!map) return;
      const keywordMarkers = await mapKeywordSearchHandler(map, mapSearch);

      if (!!!keywordMarkers.length) {
        setToastText('위치를 찾을 수 없습니다.');
        setVisible(!visible);
      }

      setMarkers(keywordMarkers);
    } catch (error) {}
  };

  const markerHandler = async (mouseEvent: kakao.maps.event.MouseEvent) => {
    try {
      if (!map) return;

      const marker = await getPlaceNameFromCoordinates(map, mouseEvent);
      setMarkers(marker);
    } catch (error) {
      alert('마커 에러!');
    }
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              enterKeyDownHandler(e, mapSearchHandler)
            }
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
          className={styles.map}
          center={{
            lat: currentLocation?.lat || 0,
            lng: currentLocation?.lng || 0,
          }}
          level={1}
          onCreate={setMap}
          onClick={(_t, mouseEvent) => {
            markerHandler(mouseEvent);
          }}
        >
          {markers.map((marker) => (
            <MapMarker
              key={marker.id}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <Button
                  text={marker.content}
                  onClick={() => {
                    setAddr({
                      placeName: marker.content,
                      lat: marker.position.lat,
                      lng: marker.position.lng,
                    });
                    closeModal();
                  }}
                  style={{
                    width: 'max-content',
                    minWidth: '150px',
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
export default MapModal;
