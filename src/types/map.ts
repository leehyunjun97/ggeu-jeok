export interface Marker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}
