import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function Sucursales() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const myMap = useRef<Map | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = "pk.eyJ1IjoibmFodWkiLCJhIjoiY20yOTBiNjltMDBhYjJzcHk5MDdmc2xxNCJ9.mV_b0a8Xd74QivUBZqmADg"; // Reemplaza con tu token

        if (mapContainer.current) {
            myMap.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-86.81622976235745, 21.091662297320077], 
                zoom: 10,
            });

            const locations = [
                { name: "Sucursal palmaris", lng: -86.85216667811258, lat: 21.112062568243914 },
                { name: "Sucursal las americas", lng: -86.82395439418096, lat: 21.147223885373723 },
                { name: "Sucursal zona hotelera", lng: -86.74666033871232, lat: 21.13352059670605 },
                { name: "Sucursal cancun park", lng: -86.85396900590477, lat: 21.043029490009122 },
            ];

            locations.forEach((location) => {
                new mapboxgl.Marker()
                    .setLngLat([location.lng, location.lat])
                    .setPopup(new mapboxgl.Popup().setText(location.name))
                    .addTo(myMap.current!); // Use '!' to assert that 'myMap.current' is not null
            });
        }

        return () => {
            if (myMap.current) {
                myMap.current.remove();
            }
        };
    }, []);

    return (
        <div>
            <br />
            <h1>Ubicaciones de Nuestras Sucursales</h1> {/* Título ajustado */}
            <br />
            <div
                ref={mapContainer}
                style={{
                    width: "90%", // Cambia a un 80% del ancho del contenedor
                    height: "300px", // Reduce la altura del mapa
                    margin: "0 auto 80px", // Añade un margen inferior de 50px para separar el footer
                }}
            ></div>
        </div>
    );
}

export default Sucursales;
