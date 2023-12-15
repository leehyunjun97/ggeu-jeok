import { Marker } from '../../types/map';

const geocoder = new window.kakao.maps.services.Geocoder();
const ps = new kakao.maps.services.Places();
const bounds = new kakao.maps.LatLngBounds();

export const getPlaceNameFromCoordinates = (
  map: kakao.maps.Map,
  mouseEvent: kakao.maps.event.MouseEvent
): Promise<Marker[]> => {
  let markers: Marker[] = [];
  return new Promise((resolve, reject) => {
    geocoder.coord2Address(
      mouseEvent.latLng.getLng(),
      mouseEvent.latLng.getLat(),
      async (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addr = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          console.log(mouseEvent.latLng.getLat(), mouseEvent.latLng.getLng());

          const keywordMarker = await mapKeywordSearchHandler(map, addr);
          let placeName;

          if (!!keywordMarker.length) {
            placeName = keywordMarker[0].content;
          }

          markers.push({
            id: `${mouseEvent.point.x + mouseEvent.point.y}`,
            position: {
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            },
            content: placeName ?? addr,
          });
          resolve(markers);
        } else {
          reject(new Error('주소변환에러'));
        }
      }
    );
  });
};

// 키워드를 받아서

export const mapKeywordSearchHandler = (
  map: kakao.maps.Map,
  keyword: string
): Promise<Marker[]> => {
  let markers: Marker[] = [];
  return new Promise((resolve, reject) => {
    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        data.map((item) => {
          console.log(item);
          markers.push({
            id: item.x + item.y,
            position: {
              lat: Number(item.y),
              lng: Number(item.x),
            },
            content: `${item.address_name} ${item.place_name}`,
          });
          return bounds.extend(
            new kakao.maps.LatLng(Number(item.y), Number(item.x))
          );
        });
        resolve(markers);
        map.setBounds(bounds);
      } else {
        resolve(markers);
      }
    });
  });
};
