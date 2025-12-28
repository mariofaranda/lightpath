import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // 1. Create the scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xe8e6e3) // warm light gray

    // 2. Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,  // field of view
      window.innerWidth / window.innerHeight,  // aspect ratio
      0.1,  // near clipping plane
      1000  // far clipping plane
    )
    camera.position.z = 5  // move camera back so we can see the sphere

    // 3. Create the renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true  // smooth edges
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // 4. Create a sphere (our Earth)
    const geometry = new THREE.SphereGeometry(2, 64, 64)
    // radius: 2, width segments: 64, height segments: 64
    
    const material = new THREE.MeshStandardMaterial({
      color: 0x9d9d9d,
      roughness: 0.7,
      metalness: 0.1
    })
    
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add ambient light (soft overall illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Add directional light (like the sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    // 5. Animation loop
    function animate() {
      requestAnimationFrame(animate)
      
      // Rotate the sphere
      sphere.rotation.y += 0.001
      
      renderer.render(scene, camera)
    }
    
    animate()

    // 6. Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)

    // 7. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="app">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default App