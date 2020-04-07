import React, { useEffect, useRef } from "react"
import { PointsCloudSystem, Scene, Vector3, Color4, Mesh, Color3 } from "@babylonjs/core"
import { useBabylonScene } from "react-babylonjs"
import { CreatedInstance } from "react-babylonjs/dist/CreatedInstance"

type Particle = {
  position: Vector3
  color: Color4
}

const loadKitti = async (size: number, path: string, scene: Scene): Promise<PointsCloudSystem> => {
  const response = await fetch(path)
  const buffer = await response.arrayBuffer()
  const floats = new Float32Array(buffer)
  const nbPoints = floats.length / 4

  // particle is the current particle, the i-th one in the PCS and the s-th one in its group
  const myFunc = (particle: Particle, i: number, s: number): any => {
    // KITTI-formatted PCD
    const x = floats[4 * i]
    const y = floats[4 * i + 1]
    const z = floats[4 * i + 2]
    particle.position = new Vector3(x, y, z)
    particle.color = Color4.FromColor3(Color3.White())
  }

  const pcs = new PointsCloudSystem("pcs", size, scene)
  pcs.addPoints(nbPoints, myFunc)

  return pcs
}

type Props = {
  path: string
  size: number
}

const PointCloudLoader: React.FC<Props> = props => {
  const scene = useBabylonScene()
  const ref = useRef<CreatedInstance<Mesh>>()

  useEffect(() => {
    const mesh = ref.current?.hostInstance
    if (!scene || !mesh) return

    loadKitti(props.size, props.path, scene)
      .then(pcs => {
        pcs.buildMeshAsync().then(() => {
          mesh.material = pcs.mesh.material
        })
      })
      .catch(_ => console.log(`Failed to load ${props.path}`))
  }, [scene, props.path, props.size])

  return <mesh name="pcs" ref={ref} />
}

export default PointCloudLoader
