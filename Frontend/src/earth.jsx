import "./index.css";
import * as THREE from "three";

function Earth() {
  const earthTexture = new THREE.TextureLoader().load("../public/texture.jpg");
  return (
    <mesh rotation={[0, 0, 0]}>
      <sphereGeometry args={[80, 32, 32]} />
      <meshPhongMaterial map={earthTexture} shininess={10} />
    </mesh>
  );
}

export default Earth;
