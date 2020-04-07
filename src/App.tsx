import React from "react"
import "./App.css"
import { Scene, Engine } from "react-babylonjs"
import { Vector3 } from "@babylonjs/core"
import PointCloudLoader from "./PointCloudLoader"

const path = `${process.env.PUBLIC_URL}/assets/velodyne/000000.bin`

const App: React.FC = () => {
  return (
    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
      <Scene>
        <arcRotateCamera name="camera1" target={Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 2} radius={20} />
        <PointCloudLoader path={path} size={2} />
        <hemisphericLight name="light1" intensity={0.7} direction={new Vector3(1, 0.5, 0)} />
        <hemisphericLight name="light2" intensity={0.8} direction={new Vector3(-1, 0.5, 0)} />
      </Scene>
    </Engine>
  )
}

export default App
