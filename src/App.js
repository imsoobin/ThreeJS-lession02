import React, {useRef, useState} from 'react';
import './App.scss';
import {Canvas, useFrame} from 'react-three-fiber';
import {OrbitControls, softShadows, MeshWobbleMaterial} from '@react-three/drei';
import {useSpring, a} from '@react-spring/three';

softShadows();

const Box = ({position, args, color, speed}) => {
  const mesh = useRef(null);
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.3, 1.3, 1.3] : [1, 1, 1]
  });
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow 
      position={position} 
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      {/* <meshStandardMaterial attach="material" color={color} /> */}
      <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={.6} />
    </a.mesh>
  )
};
function App() {
  return (
    <>
      <Canvas shadows camera={{position: [-5, 2, 10], fov: 60}} className='App'>
        <ambientLight intensity={.9} /> 
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.2}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          shadowCameraFar={50}
          shadowCameraTop={10}
          shadowCameraRight={10}
          shadowCameraLeft={-10}
          shadowCameraBottom={-10}
        />

        <pointLight position={[-10, 0, -20]} intensity={.9} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            {/* <meshStandardMaterial attach="material" color={'yellow'} />  */}
            <shadowMaterial attach='material' opacity={.2} />
          </mesh>
        </group>

        <Box position={[0, 1, 0]} args={[3, 2, 1]} color={'green'} speed={1} />
        <Box position={[-2, 1, -5]} color={'red'} speed={5} />
        <Box position={[5, 1, -2]} color={'blue'} speed={5} />  
        <OrbitControls makeDefault />
        
      </Canvas>
    </>
  );
}

export default App;
