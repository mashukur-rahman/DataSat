import "./index.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Earth from "./earth";
import Satellite from "./Satellite";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Locationform from "./locationForm";
import Navigator from "./Navbar";

function Home() {
  const [latLongArray, setLatLongArray] = useState([]);
  const [userlatlong, setLatlong] = useState({
    userlatitude: "",
    userlongitude: "",
  });

  useEffect(() => {
    const userLocation = navigator.geolocation;
    userLocation.getCurrentPosition((position) => {
      setLatlong({
        userlatitude: position.coords.latitude,
        userlongitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    async function getsat() {
      try {
        if (
          userlatlong.userLongitude !== "" &&
          userlatlong.userlatitude !== ""
        ) {
          var response2 = await axios.get(
            "http://localhost:5000/n2yo/rest/v1/satellite/positions/39084/" +
              userlatlong.userlatitude +
              "/" +
              userlatlong.userLongitude +
              "/0/300/&apiKey=FKD8P9-RSUKDY-L3M9N8-5CG4"
          );
          const positions = response2.data.positions.map((pos) => [
            pos.satlatitude,
            pos.satlongitude,
          ]);
          setLatLongArray(positions);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getsat();
  }, [userlatlong.userLongitude, userlatlong.userlatitude]);

  return (
    <>
      {latLongArray.length != 0 && (
        <>
          <div className="earth">
            <Navigator />
            <Canvas camera={{ position: [20, 200, 4], fov: 90 }}>
              <ambientLight intensity={15} />
              <pointLight position={[-85, 85, 85]} intensity={400000} />

              <Stars
                radius={300}
                depth={50}
                count={5000}
                factor={7}
                saturation={0}
                fade={false}
              />
              <Suspense fallback={null}>
                <Earth />
                <Satellite latLongArray={latLongArray} radius={80} />
              </Suspense>
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>
          <Locationform values={userlatlong} />
        </>
      )}
      {latLongArray.length == 0 && (
        <Spinner animation="border" variant="light" className="loading" />
      )}
    </>
  );
}

export default Home;
