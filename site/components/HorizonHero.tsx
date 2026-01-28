'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface ShaderPlaneProps {
  vertexShader: string
  fragmentShader: string
  uniforms: { [key: string]: { value: unknown } }
}

const ShaderPlane = ({ vertexShader, fragmentShader, uniforms }: ShaderPlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { size } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0)
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// Shader tuned for your warm beige palette:
// base: #f8f6f1 (--bg), accent tones pulled from #2c3e50 (--accent) and #5c6370 (--muted)
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;

  vec2 toPolar(vec2 p) {
    float r = length(p);
    float a = atan(p.y, p.x);
    return vec2(r, a);
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 p = 5.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

    vec2 polar = toPolar(p);
    float r = polar.x;

    vec2 i = p;
    float c = 0.0;
    float rot = r + u_time + p.x * 0.08;

    for (float n = 0.0; n < 4.0; n++) {
      float rr = r + 0.12 * sin(u_time * 0.6 + float(n) + r * 1.8);
      p *= mat2(
        cos(rot - sin(u_time / 12.0)), sin(rot),
        -sin(cos(rot) - u_time / 12.0), cos(rot)
      ) * -0.25;

      float t = r - u_time / (float(n) + 30.0);
      i -= p + sin(t - i.y) + rr;

      c += 2.0 / length(vec2(
        (sin(i.x + t) / 0.12),
        (cos(i.y + t) / 0.12)
      ));
    }

    c /= 8.0;

    // Warm palette: deep teal-slate accent on cream
    vec3 accent = vec3(0.17, 0.24, 0.31);   // --accent #2c3e50
    vec3 mid    = vec3(0.36, 0.39, 0.44);   // --muted #5c6370
    vec3 base   = vec3(0.97, 0.96, 0.95);   // --bg #f8f6f1

    float intensity = smoothstep(0.0, 1.0, c * 0.5);
    vec3 color = mix(base, mix(accent, mid, intensity * 0.4), intensity * 0.35);

    fragColor = vec4(color, 1.0);
  }

  void main() {
    vec4 fragColor;
    vec2 fragCoord = vUv * u_resolution.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
  }
`

export default function HorizonHero() {
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
    }),
    []
  )

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas>
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </Canvas>
    </div>
  )
}
