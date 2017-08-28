// 引入three.js
import * as THREE from "three";
// import { OrbitControls } from "three/examples/js/controls/OrbitControls";
import "three/examples/js/controls/OrbitControls";
export class Greeter {
  constructor(public greeting: string) {
  } 

  private renderer: any;
  private width: number;
  private height: number;
  public initThree() {
    this.width = document.getElementById("canvas-frame").clientWidth;
    this.height = document.getElementById("canvas-frame").clientHeight;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setSize(this.width, this.height);
    document.getElementById("canvas-frame").appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xFFFFFF, 1.0);
  }

  private camera: any;
  public initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
    this.camera.position.x = 0;
    this.camera.position.y = 10;
    this.camera.position.z = 0;
    this.camera.up.x = 0;
    this.camera.up.y = 0;
    this.camera.up.z = 1;
    this.camera.lookAt({
      x: 0,
      y: 0,
      z: 0,
    });
  }

  private scene: any;
  public initScene() {
    this.scene = new THREE.Scene();
  }

  private light: any;
  public initLight() {
    this.light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);
  }

  private point: any;
  public createPoint() {
    const geopoint = new THREE.Geometry();
    geopoint.vertices.push(new THREE.Vector3(-3, 0, 0));
    const materialpoint = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
    this.point = new THREE.Points(geopoint, materialpoint);
    this.scene.add(this.point);
  }
  private line: any;
  public createLine() {
    const geoline = new THREE.Geometry();
    geoline.vertices.push(new THREE.Vector3(-1, 0, 2));
    geoline.vertices.push(new THREE.Vector3(0, 1, 2));
    geoline.vertices.push(new THREE.Vector3(1, 0, 2));
    const materialline = new THREE.LineBasicMaterial({ color: 0x0000ff });
    this.line = new THREE.Line(geoline, materialline);
    this.scene.add(this.line);
  }
  private model: any;
  public createBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.model = new THREE.Mesh(geometry, material);
    this.scene.add(this.model);
  }
  private mesh: any;
  public createPolygon() {
    const geopolygon = new THREE.Geometry();
    geopolygon.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 2, 0));
    const normal = new THREE.Vector3(0, 0, 1);
    const normal1 = new THREE.Vector3(0, 0, -1);
    const face = new THREE.Face3(0, 1, 2, normal);
    const face1 = new THREE.Face3(0, 2, 1, normal1);
    geopolygon.faces.push(face, face1);
    const material = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geopolygon, material);
    this.scene.add(this.mesh);
  }
  public initObject() {
    this.createPoint();
    this.createLine();
    this.createBox();
    this.createPolygon();
  }
  private raycaster: any;
  private mouse: any;
  public intRayCaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    document.addEventListener("click", this.onDocumentMouseClick, false);
  }

  public onDocumentMouseClick(event: any) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1; //标准设备横坐标
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; //标准设备纵坐标
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      //intersects[0].object.material.color.set( 0xff0000 );
      //intersects[0].object.material.opacity = 0.6;
      alert(intersects[0].object.material.color);
    }
    this.renderer.clear();
  }
  private controls: any;
  public initEvent() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    //this.controls = new THREE.OrbitControls(this.camera);
    this.controls.addEventListener("change", this.renderer);
  }

  public threeStart() {
    this.initThree();
    this.initCamera();
    this.initScene();
    this.initLight();
    this.initObject();
    this.intRayCaster();
    this.initEvent();
    this.renderer.clear();
  }
  public animate() {
    
    window.requestAnimationFrame(()=>this.animate);
    // console.log(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.mouse, this.camera);
  };
  //this.animate();
};
