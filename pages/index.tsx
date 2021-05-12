import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

interface DataLocation {
  lat: number;
  lng: number;
}

interface DataMarksLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<DataLocation>({
    lat: -23.31509536897005,
    lng: -46.57099951314262,
  });

  const [dataMarks, setDataMarks] = useState<DataMarksLocation[]>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "api/hello",
    }).then(({ data }) => setDataMarks(data));
  }, []);

  useEffect(() => {
    (() => {
      const script = document.createElement("script");
      script.src =
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js";
      script.async = true;
      document.body.appendChild(script);
    })();
  }, []);

  function GoogleMapsMarkerClusterer(map, maps) {
    let googleMapRef = map;
    let googleRef = maps;

    let markers =
      dataMarks &&
      dataMarks.map((location) => {
        return new googleRef.Marker({
          position: { lat: location.latitude, lng: location.longitude },
        });
      });

    let markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      gridSize: 75,
      minimumClusterSize: 2,
    });
  }

  if (!dataMarks) {
    return <h1>Load</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mapsContainer}>
        <GoogleMapReact
          //style={{ width: "100%", height: "90%" }}
          defaultCenter={location}
          yesIWantToUseGoogleMapApiInternals
          defaultZoom={11}
          onGoogleApiLoaded={({ map, maps }) =>
            GoogleMapsMarkerClusterer(map, maps)
          }
          bootstrapURLKeys={{ key: "AIzaSyD92YFv2ryerw2pYxbc-OY1V9nDTUyhDYU" }}
          options={{ zoomControlOptions: { position: 7 } }}
        ></GoogleMapReact>
      </div>
    </div>
  );
}
