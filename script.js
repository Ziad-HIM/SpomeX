// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the house
const houseGeometry = new THREE.BoxGeometry(2, 2, 2);
const houseMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
scene.add(house);

// Create the roof
const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 1.5;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Create the door
const doorGeometry = new THREE.BoxGeometry(0.5, 1, 0.1);
const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, -0.5, 1.05);
house.add(door);

// Create the windows
const windowGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
const windowMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.set(0.75, 0, 1.05);
house.add(window1);
const window2 = window1.clone();
window2.position.set(-0.75, 0, 1.05);
house.add(window2);

// Create balloons and strings
const balloonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const balloonColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const balloons = [];
const balloonStrings = [];
for (let i = 0; i < 50; i++) { // Increased the number of balloons to 50
    const balloonMaterial = new THREE.MeshBasicMaterial({ color: balloonColors[i % balloonColors.length] });
    const balloon = new THREE.Mesh(balloonGeometry, balloonMaterial);
    balloon.position.set(Math.random() * 2 - 1, Math.random() * 2 + 2, Math.random() * 2 - 1);
    house.add(balloon);
    balloons.push(balloon);

    // Create string
    const stringGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 1.5, 0), // Tip of the house roof
        balloon.position
    ]);
    const stringMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const string = new THREE.Line(stringGeometry, stringMaterial);
    house.add(string);
    balloonStrings.push(string);
}

// Set the background color to night sky
scene.background = new THREE.Color(0x000000);

// Create stars
function createStars() {
    const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
        scene.add(star);
    }
}
createStars();

// Create Earth
const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(5, 5, -10);
scene.add(earth);

// Create Moon
const moonGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-5, -5, -10);
scene.add(moon);

// Create Saturn
const saturnGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(10, 2, -15);
scene.add(saturn);

// Add Saturn's rings
const ringGeometry = new THREE.RingGeometry(0.8, 1.2, 32);
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide });
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
saturn.add(ring);

camera.position.z = 5;

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // for smooth movement
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2; // limit vertical movement

// Keyboard controls
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener('keydown', (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key.toLowerCase()] = false;
});

function moveCamera() {
    if (keys.w) camera.position.z -= 0.1;
    if (keys.s) camera.position.z += 0.1;
    if (keys.a) camera.position.x -= 0.1;
    if (keys.d) camera.position.x += 0.1;
}

function animate() {
    requestAnimationFrame(animate);
    moveCamera();
    controls.update(); // required if controls.enableDamping or controls.autoRotate are set to true
    renderer.render(scene, camera);
}

animate();
