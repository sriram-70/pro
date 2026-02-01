'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import * as THREE from 'three';
import { useScrollStore } from '@/hooks/useScrollStore';

// Vertex Shader
const vertexShader = `
//
// 3D Simplex Noise Implementation
// Based on Stefan Gustavson's implementation
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalize gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// Uniforms
uniform float u_time;
uniform float u_scroll; // 0.0 to 1.0

// Varyings to pass to fragment shader
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  // Calculate noise strength based on scroll position
  float noiseStrength;
  if (u_scroll < 0.5) {
    noiseStrength = mix(1.5, 0.3, u_scroll * 2.0);
  } else {
    noiseStrength = mix(0.3, 0.0, (u_scroll - 0.5) * 2.0);
  }

  // Multi-octave noise for more organic displacement
  vec3 noisePos = position * 0.8 + u_time * 0.15;
  
  float noise = snoise(noisePos);
  noise += 0.5 * snoise(noisePos * 2.0);
  noise += 0.25 * snoise(noisePos * 4.0);
  noise /= 1.75;
  
  vNoise = noise;
  
  // Displace vertices along normal
  vec3 displaced = position + normal * noise * noiseStrength;
  
  vNormal = normalize(normalMatrix * normal);
  vPosition = displaced;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
//
// Oklab Color Space Implementation
//

vec3 srgbToOklab(vec3 c) {
  vec3 rgb = pow(c, vec3(2.2));
  
  mat3 m1 = mat3(
    0.4122214708, 0.5363325363, 0.0514459929,
    0.2119034982, 0.6806995451, 0.1073969566,
    0.0883024619, 0.2817188376, 0.6299787005
  );
  vec3 lms = m1 * rgb;
  
  lms = pow(lms, vec3(1.0/3.0));
  mat3 m2 = mat3(
    0.2104542553, 0.7936177850, -0.0040720468,
    1.9779984951, -2.4285922050, 0.4505937099,
    0.0259040371, 0.7827717662, -0.8086757660
  );
  return m2 * lms;
}

vec3 oklabToSrgb(vec3 c) {
  mat3 m1 = mat3(
    1.0, 0.3963377774, 0.2158037573,
    1.0, -0.1055613458, -0.0638541728,
    1.0, -0.0894841775, -1.2914855480
  );
  vec3 lms = m1 * c;
  lms = lms * lms * lms;
  
  mat3 m2 = mat3(
    4.0767416621, -3.3077115913, 0.2309699292,
    -1.2684380046, 2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, 1.7076147010
  );
  vec3 rgb = m2 * lms;
  
  return pow(rgb, vec3(1.0/2.2));
}

uniform float u_scroll;
uniform float u_time;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  // Color Palettes
  vec3 peach = vec3(1.0, 0.82, 0.7);
  vec3 lavender = vec3(0.9, 0.9, 0.98);
  vec3 cyan = vec3(0.0, 0.94, 1.0);
  vec3 chrome = vec3(1.0, 1.0, 1.0);
  vec3 magma = vec3(1.0, 0.16, 0.0);
  vec3 voidPurple = vec3(0.16, 0.0, 0.2);
  
  // Convert to Oklab
  vec3 peachLab = srgbToOklab(peach);
  vec3 lavenderLab = srgbToOklab(lavender);
  vec3 cyanLab = srgbToOklab(cyan);
  vec3 chromeLab = srgbToOklab(chrome);
  vec3 magmaLab = srgbToOklab(magma);
  vec3 voidLab = srgbToOklab(voidPurple);
  
  // Mix colors based on scroll
  vec3 finalColorLab;
  
  if (u_scroll < 0.33) {
    float t = u_scroll / 0.33;
    vec3 morningBase = mix(peachLab, lavenderLab, vNoise * 0.5 + 0.5);
    vec3 noonBase = mix(cyanLab, chromeLab, vNoise * 0.5 + 0.5);
    finalColorLab = mix(morningBase, noonBase, t);
  } else if (u_scroll < 0.66) {
    float t = (u_scroll - 0.33) / 0.33;
    vec3 noonBase = mix(cyanLab, chromeLab, vNoise * 0.5 + 0.5);
    vec3 sunsetBase = mix(magmaLab, voidLab, vNoise * 0.5 + 0.5);
    finalColorLab = mix(noonBase, sunsetBase, t);
  } else {
    float t = (u_scroll - 0.66) / 0.34;
    vec3 sunsetBase = mix(magmaLab, voidLab, vNoise * 0.5 + 0.5);
    finalColorLab = sunsetBase;
  }
  
  vec3 finalColor = oklabToSrgb(finalColorLab);
  
  // Fresnel rim light
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);
  
  vec3 rimColor;
  if (u_scroll < 0.5) {
    rimColor = mix(peach, cyan, u_scroll * 2.0);
  } else {
    rimColor = mix(cyan, magma, (u_scroll - 0.5) * 2.0);
  }
  
  finalColor += rimColor * fresnel * 0.8;
  
  // Pulsing glow
  float pulse = sin(u_time * 0.5) * 0.5 + 0.5;
  finalColor += finalColor * pulse * 0.1;
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function TheSun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  // Create shader material with uniforms
  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_scroll: { value: 0 },
      },
    });
  }, []);

  // Update uniforms every frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.u_scroll.value = scrollProgress;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* High-poly icosahedron for smooth noise displacement */}
      <icosahedronGeometry args={[2, 64]} />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}
