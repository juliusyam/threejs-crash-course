import './App.css'
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  DoubleSide
} from 'three';
import {useEffect} from "react";
import {useStateRef} from "./utilities/stateRef";

function App() {

  const [current, divRef] = useStateRef<HTMLDivElement>(node => node);

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

  const renderer = new WebGLRenderer();

  const boxGeometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
  });

  const planeGeometry = new PlaneGeometry(5, 5, 10, 10);
  const planeMaterial = new MeshBasicMaterial({
    color: 0xFF0000,
    side: DoubleSide,
  });

 const mesh = new Mesh(boxGeometry, material);
 const planeMesh = new Mesh(planeGeometry, planeMaterial);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    planeMesh.rotation.x += 0.01;
  }

  useEffect(() => {
    animate();
  });

  useEffect(() => {
    if (current) {
      scene.add(mesh);
      scene.add(planeMesh);

      camera.position.z = 5;

      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio);

      current.appendChild(renderer.domElement);
    }

    return () => {
      current?.removeChild(renderer.domElement);
    }
  }, [current]);

  return (
    <div className="App" ref={ divRef } />
  )
}

export default App
