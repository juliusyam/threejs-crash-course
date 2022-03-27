import './App.css'
import {PerspectiveCamera, Scene, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import {useEffect} from "react";
import {useStateRef} from "./utilities/stateRef";

function App() {

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

  const renderer = new WebGLRenderer();

  const boxGeometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
  });

 const mesh = new Mesh(boxGeometry, material);

  console.log(scene, camera, renderer, boxGeometry, material, mesh);

  const [current, divRef] = useStateRef<HTMLDivElement>(node => node);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }

  useEffect(() => {
    animate();
  });

  useEffect(() => {
    if (current) {
      scene.add(mesh);

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
