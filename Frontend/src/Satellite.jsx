// import "./index.css";
// import { useFrame } from "@react-three/fiber";

// import { useState, useEffect, useRef } from "react";

// function latLongToCartesian(lat, lon, radius) {
//   const phi = (90 - lat) * (Math.PI / 180); // Convert to radians
//   const theta = (lon + 180) * (Math.PI / 180); // Convert to radians

//   const x = -(radius * Math.sin(phi) * Math.cos(theta));
//   const y = radius * Math.cos(phi);
//   const z = radius * Math.sin(phi) * Math.sin(theta);

//   return [x, y, z];
// }

// function Satellite({ latLongArray, radius }) {
//   const dotRef = useRef();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useFrame(() => {
//     if (dotRef.current) {
//       const [lat, lon] = latLongArray[currentIndex];
//       const [x, y, z] = latLongToCartesian(lat, lon, radius);
//       dotRef.current.position.set(x, y, z);
//     }
//   });

//   // Move the dot every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % latLongArray.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [latLongArray]);

//   return (
//     <mesh ref={dotRef}>
//       <sphereGeometry args={[1, 16, 16]} />
//       <meshBasicMaterial color="red" />
//     </mesh>
//   );
// }

// export default Satellite;

import "./index.css";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";

function latLongToCartesian(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180); // Convert to radians
  const theta = (lon + 180) * (Math.PI / 180); // Convert to radians

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
}

function Satellite({ latLongArray, radius }) {
  const dotRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (dotRef.current) {
      const [lat, lon] = latLongArray[currentIndex];
      const [x, y, z] = latLongToCartesian(lat, lon, radius);
      dotRef.current.position.set(x, y, z);
    }
  });

  // Move the dot every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % latLongArray.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [latLongArray]);

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  return (
    <>
      <mesh
        ref={dotRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="red" />
      </mesh>
      {hovered && (
        <Html>
          <div
            style={{
              position: "absolute",
              color: "white",
              pointerEvents: "none",
            }}
          >
            Latitude: {latLongArray[currentIndex][0].toFixed(4)} <br />
            Longitude: {latLongArray[currentIndex][1].toFixed(4)}
          </div>
        </Html>
      )}
    </>
  );
}

export default Satellite;
