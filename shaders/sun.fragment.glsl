//
// Oklab Color Space Implementation
// For perceptually uniform color mixing
//

// Linear sRGB to Oklab
vec3 srgbToOklab(vec3 c) {
  // sRGB to linear RGB
  vec3 rgb = pow(c, vec3(2.2));
  
  // Linear RGB to LMS
  mat3 m1 = mat3(
    0.4122214708, 0.5363325363, 0.0514459929,
    0.2119034982, 0.6806995451, 0.1073969566,
    0.0883024619, 0.2817188376, 0.6299787005
  );
  vec3 lms = m1 * rgb;
  
  // LMS to Oklab
  lms = pow(lms, vec3(1.0/3.0));
  mat3 m2 = mat3(
    0.2104542553, 0.7936177850, -0.0040720468,
    1.9779984951, -2.4285922050, 0.4505937099,
    0.0259040371, 0.7827717662, -0.8086757660
  );
  return m2 * lms;
}

// Oklab to Linear sRGB
vec3 oklabToSrgb(vec3 c) {
  // Oklab to LMS
  mat3 m1 = mat3(
    1.0, 0.3963377774, 0.2158037573,
    1.0, -0.1055613458, -0.0638541728,
    1.0, -0.0894841775, -1.2914855480
  );
  vec3 lms = m1 * c;
  lms = lms * lms * lms;
  
  // LMS to linear RGB
  mat3 m2 = mat3(
    4.0767416621, -3.3077115913, 0.2309699292,
    -1.2684380046, 2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, 1.7076147010
  );
  vec3 rgb = m2 * lms;
  
  // Linear RGB to sRGB
  return pow(rgb, vec3(1.0/2.2));
}

// Uniforms
uniform float u_scroll; // 0.0 to 1.0
uniform float u_time;

// Varyings from vertex shader
varying vec3 vNormal;
varying vec3 vPosition;
varying float vNoise;

void main() {
  // Color Palettes (in sRGB, will convert to Oklab)
  // Morning Palette
  vec3 peach = vec3(1.0, 0.82, 0.7);      // #FFD1B3
  vec3 lavender = vec3(0.9, 0.9, 0.98);   // #E6E6FA
  
  // Noon Palette
  vec3 cyan = vec3(0.0, 0.94, 1.0);       // #00F0FF
  vec3 chrome = vec3(1.0, 1.0, 1.0);      // #FFFFFF
  
  // Sunset Palette
  vec3 magma = vec3(1.0, 0.16, 0.0);      // #FF2A00
  vec3 voidPurple = vec3(0.16, 0.0, 0.2); // #2A0033
  
  // Convert all colors to Oklab space
  vec3 peachLab = srgbToOklab(peach);
  vec3 lavenderLab = srgbToOklab(lavender);
  vec3 cyanLab = srgbToOklab(cyan);
  vec3 chromeLab = srgbToOklab(chrome);
  vec3 magmaLab = srgbToOklab(magma);
  vec3 voidLab = srgbToOklab(voidPurple);
  
  // Mix colors based on scroll position
  vec3 finalColorLab;
  
  if (u_scroll < 0.33) {
    // Morning Phase (0.0 - 0.33)
    float t = u_scroll / 0.33;
    vec3 morningBase = mix(peachLab, lavenderLab, vNoise * 0.5 + 0.5);
    vec3 noonBase = mix(cyanLab, chromeLab, vNoise * 0.5 + 0.5);
    finalColorLab = mix(morningBase, noonBase, t);
  } else if (u_scroll < 0.66) {
    // Noon Phase (0.33 - 0.66)
    float t = (u_scroll - 0.33) / 0.33;
    vec3 noonBase = mix(cyanLab, chromeLab, vNoise * 0.5 + 0.5);
    vec3 sunsetBase = mix(magmaLab, voidLab, vNoise * 0.5 + 0.5);
    finalColorLab = mix(noonBase, sunsetBase, t);
  } else {
    // Sunset Phase (0.66 - 1.0)
    float t = (u_scroll - 0.66) / 0.34;
    vec3 sunsetBase = mix(magmaLab, voidLab, vNoise * 0.5 + 0.5);
    finalColorLab = sunsetBase;
  }
  
  // Convert back to sRGB
  vec3 finalColor = oklabToSrgb(finalColorLab);
  
  // Fresnel Rim Light Effect
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);
  
  // Rim light color changes with scroll
  vec3 rimColor;
  if (u_scroll < 0.5) {
    rimColor = mix(peach, cyan, u_scroll * 2.0);
  } else {
    rimColor = mix(cyan, magma, (u_scroll - 0.5) * 2.0);
  }
  
  // Add rim light
  finalColor += rimColor * fresnel * 0.8;
  
  // Add subtle pulsing glow
  float pulse = sin(u_time * 0.5) * 0.5 + 0.5;
  finalColor += finalColor * pulse * 0.1;
  
  // Output
  gl_FragColor = vec4(finalColor, 1.0);
}
