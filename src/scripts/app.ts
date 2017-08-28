import "../styles/base.scss";


// 引入three.js
import * as THREE from "three";

// OrbitControls.js expects a global THREE object
(window as any).THREE = THREE;

// NOTE: OrbitControls must be included with require:
// using "import" cause it to be executed before global THREE becomes available
import "three/examples/js/controls/OrbitControls";
//require("three/examples/js/controls/OrbitControls");

//THREE.OrbitControls = require('imports?THREE=three!exports?THREE.OrbitControls!../../node_modules\/three\/examples\/js\/controls\/OrbitControls');

// ... code that uses THREE and THREE.OrbitControls


// 上面引入样式资源文件
// 业务逻辑代码从这里开始写

import { Greeter } from "./greeter";


// OrbitControls.js expects a global THREE object
(window as any).THREE = THREE;

const greeter: Greeter = new Greeter("this istypescritpt test demo");

greeter.threeStart();
greeter.animate();



//document.getElementById("greeting").innerHTML = greeter.greet();

//console.log(THREE);
