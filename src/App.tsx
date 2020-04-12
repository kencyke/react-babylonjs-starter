import React, { useRef } from "react"
import { Scene, Engine, SceneEventArgs } from "react-babylonjs"
import { Vector3, Nullable } from "@babylonjs/core"
import PointCloudLoader from "./PointCloudLoader"

const path = `${process.env.PUBLIC_URL}/assets/velodyne/000000.bin`

function onSceneMount(evt: SceneEventArgs, mirrorCanvas: Nullable<HTMLCanvasElement>): void {
  const { scene } = evt

  const engine = scene.getEngine()
  if (mirrorCanvas) {
    engine.registerView(mirrorCanvas)
  }
}

const App: React.FC = () => {
  const mirrorCanvasRef = useRef<Nullable<HTMLCanvasElement>>(null)

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-row flex-wrap -mx-2">
        <div className="w-full h-64 md:h-auto mb-4 px-2">
          <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
            <Scene onSceneMount={evt => onSceneMount(evt, mirrorCanvasRef.current)}>
              <arcRotateCamera
                name="camera1"
                target={Vector3.Zero()}
                alpha={Math.PI / 2}
                beta={Math.PI / 2}
                radius={20}
              />
              <PointCloudLoader path={path} size={2} />
              <hemisphericLight name="light1" intensity={0.7} direction={new Vector3(1, 0.5, 0)} />
              <hemisphericLight name="light2" intensity={0.8} direction={new Vector3(-1, 0.5, 0)} />
            </Scene>
          </Engine>
        </div>
        <div className="w-full sm:w-1/3 h-32 md:h-48 mb-4 sm:mb-0 px-2">
          <canvas className="block" ref={mirrorCanvasRef} />
        </div>
        <div className="w-full sm:w-1/3 h-32 md:h-48 mb-4 sm:mb-0 px-2">
          <p
            className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: "url(https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Image)" }}
          >
            Image
          </p>
        </div>
        <div className="w-full sm:w-1/3 h-32 md:h-48 px-2">
          <p
            className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: "url(https://via.placeholder.com/800x600/EDF2F7/E2E8F0/&amp;text=Image)" }}
          >
            Image
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
