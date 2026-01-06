import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree, invalidate } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import { getViewerConfig } from "../config/viewerConfig";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const groupRef = useRef();
  const modelConfig = url ? getViewerConfig(url) : null;

  // Centra il modello e posiziona la camera di fronte senza rotazione
  useEffect(() => {
    if (groupRef.current && scene) {
      // Assicurati che il gruppo sia resettato prima di calcolare
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.scale.set(1, 1, 1);
      
      // Applica rotazione e scala se specificate nella configurazione
      if (modelConfig) {
        if (modelConfig.rotationX !== undefined) {
          groupRef.current.rotation.x = modelConfig.rotationX;
        }
        if (modelConfig.rotationY !== undefined) {
          groupRef.current.rotation.y = modelConfig.rotationY;
        }
        if (modelConfig.scale !== undefined) {
          groupRef.current.scale.set(
            modelConfig.scale,
            modelConfig.scale,
            modelConfig.scale
          );
        }
      }
      
      // Aggiorna la matrice del gruppo per applicare le trasformazioni
      groupRef.current.updateMatrixWorld(true);
      
      // Calcola il bounding box sul gruppo (dopo le trasformazioni) invece che sulla scene
      const box = new Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim > 0 ? maxDim * 1.2 : 10;
      
      // Sempre centra il modello all'origine spostando il gruppo
      // Sottrai il centro calcolato per centrare il modello trasformato
      groupRef.current.position.x = -center.x;
      groupRef.current.position.y = -center.y;
      groupRef.current.position.z = -center.z;
      
      // Aggiorna di nuovo la matrice dopo aver spostato il gruppo
      groupRef.current.updateMatrixWorld(true);
      
      // Posiziona la camera direttamente davanti al modello (senza rotazione/offset Y)
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0); // Guarda direttamente verso il centro
      camera.updateProjectionMatrix();
      
      // Forza l'aggiornamento dei controlli
      invalidate();
    }
  }, [scene, camera, modelConfig]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function ResizeCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}


const ThreeDViewer = ({ glbPath, active = true }) => {
  const containerRef = useRef();
  const controlsConfig = glbPath ? getViewerConfig(glbPath) : null;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (containerRef.current) {
        invalidate();
      }
    };
    
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateSize);
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // Precarica il modello per ridurre scatti all'apertura
  useEffect(() => {
    if (glbPath) {
      try {
        useGLTF.preload(glbPath);
      } catch (_) {
        // safe no-op se preload non disponibile
      }
    }
  }, [glbPath]);

  // Usa "always" quando il damping è attivo per permettere movimenti fluidi
  const frameloop = controlsConfig?.enableDamping ? "always" : "demand";

  return (
    <div className="viewer-container" ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: false, toneMappingExposure: 1.8 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ResizeCamera />
        <Suspense fallback={null}>
          <Model url={glbPath} />
        </Suspense>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        {controlsConfig && (
          <OrbitControls
            enabled={active}
            target={[0, 0, 0]}
            minDistance={controlsConfig.minDistance}
            maxDistance={controlsConfig.maxDistance}
            minPolarAngle={controlsConfig.minPolarAngle}
            maxPolarAngle={controlsConfig.maxPolarAngle}
            minAzimuthAngle={controlsConfig.minAzimuthAngle}
            maxAzimuthAngle={controlsConfig.maxAzimuthAngle}
            enablePan={controlsConfig.enablePan}
            enableZoom={controlsConfig.enableZoom}
            enableRotate={controlsConfig.enableRotate}
            enableDamping={controlsConfig.enableDamping}
            dampingFactor={controlsConfig.dampingFactor}
            rotateSpeed={controlsConfig.rotateSpeed}
            zoomSpeed={controlsConfig.zoomSpeed}
            panSpeed={controlsConfig.panSpeed}
          />
        )}
        {!controlsConfig && (
          <OrbitControls 
            enabled={active} 
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            zoomSpeed={0.6}
            panSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
};

export default ThreeDViewer;
