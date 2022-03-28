import './App.css'
import {
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {useEffect} from "react";
import {useStateRef} from "./utilities/stateRef";
import {GUI} from 'dat.gui';

function App() {

  const [current, divRef] = useStateRef<HTMLDivElement>(node => node);

  const gui = new GUI();

  const world = {
    plane: {
      width: 10,
      height: 10,
      widthSegments: 10,
      heightSegments: 10,
    }
  };

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

  const renderer = new WebGLRenderer();
  new OrbitControls(camera, renderer.domElement);

  const boxGeometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({
    color: 0x00FF00,
  });

  const planeGeometry = new PlaneGeometry(5, 5, 10, 10);
  const planeMaterial = new MeshPhongMaterial({
    color: 0xFF0000,
    side: DoubleSide,
    flatShading: true,
  });

  const mesh = new Mesh(boxGeometry, material);
  const planeMesh = new Mesh(planeGeometry, planeMaterial);

  const light = new DirectionalLight(0xffffff, 1);
  const backLight = new DirectionalLight(0xffffff, 1);

  generatePlane(planeMesh.geometry);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    //
    // planeMesh.rotation.x += 0.01;
  }

  useEffect(() => {
    animate();
  });

  useEffect(() => {
    if (current) {

      light.position.set(0, 0, 1);
      backLight.position.set(0, 0, -1);
      // scene.add(mesh);
      scene.add(planeMesh);
      scene.add(light);
      scene.add(backLight);

      camera.position.z = 5;

      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio);

      current.appendChild(renderer.domElement);
    }

    return () => {
      current?.removeChild(renderer.domElement);
    }
  }, [current]);

  useEffect(() => {
    gui.add(world.plane, 'width', 1, 20).onChange(() => {

      planeMesh.geometry.dispose();

      planeMesh.geometry = new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);

      generatePlane(planeMesh.geometry);
    });

    gui.add(world.plane, 'height', 1, 20).onChange(() => {

      planeMesh.geometry.dispose();

      planeMesh.geometry = new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);

      generatePlane(planeMesh.geometry);
    });

    gui.add(world.plane, 'widthSegments', 1, 50).onChange(() => {

      planeMesh.geometry.dispose();

      planeMesh.geometry = new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);

      generatePlane(planeMesh.geometry);
    });

    gui.add(world.plane, 'heightSegments', 1, 50).onChange(() => {

      planeMesh.geometry.dispose();

      planeMesh.geometry = new PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments);

      generatePlane(planeMesh.geometry);
    });
  });

  return (
    <div className="App" ref={divRef}/>
  )
}

export default App

function generatePlane(geometry: PlaneGeometry) {

  const { array } = geometry.attributes.position;

  for(let i = 0; i < array.length; i+=3) {

    const z = array[i + 2];

    // @ts-ignore
    array[i + 2] = z + Math.random();
  }
}