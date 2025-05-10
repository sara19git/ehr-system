import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import algeriaGeoJson from '../data/algeriaWilayas.json';



export default function AlgeriaMap() {

    const highlightedWilayas = ['Alger', 'Oran', 'Constantine'];

    const onEachFeature = (feature, layer) => {
        const wilayaName = feature.properties.name;
        layer.bindPopup(wilayaName);
      };
    
      const style = (feature) => {
        const wilayaName = feature.properties.name;
        return {
          fillColor: highlightedWilayas.includes(wilayaName) ? '#03A791' : '#CCCCCC',
          weight: 1,
          color: 'white',
          fillOpacity: 1,
        };
      };
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md ">
      <MapContainer center={[28.0339, 1.6596]} zoom={5} style={{ height: '100%', width: '100%' }}>
       
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        <GeoJSON data={algeriaGeoJson} style={style} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  );
}
