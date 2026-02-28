import { create } from "zustand";

export interface ShaderState {
  flowField: {
    detail: number;
    speed: number;
    strength: number;
  };
  stripes: {
    balance: number;
    colorA: string;
    speed: number;
  };
  simplexNoise: {
    balance: number;
    colorB: string;
    contrast: number;
    speed: number;
    visible: boolean;
  };
  dither: {
    colorA: string;
    pattern: string;
    visible: boolean;
    pixelSize: number;
  };
  imageTexture: {
    url: string | null;
    objectFit: string;
    brightness: number;
    contrast: number;
  };
  chromaticAberration: {
    strength: number;
    angle: number;
  };
  aspectRatio: string;
}

const defaults: ShaderState = {
  flowField: { detail: 1.2, speed: 0, strength: 0.25 },
  stripes: { balance: 0.1, colorA: "#a6a6a6", speed: 0.4 },
  simplexNoise: {
    balance: 0.8,
    colorB: "#e3c6f5",
    contrast: 1,
    speed: 1.1,
    visible: false,
  },
  dither: {
    colorA: "#cfcfcf",
    pattern: "blueNoise",
    visible: true,
    pixelSize: 4,
  },
  imageTexture: { url: null, objectFit: "cover", brightness: 0, contrast: 0 },
  chromaticAberration: { strength: 0.2, angle: 0 },
  aspectRatio: "16:9",
};

interface ShaderActions {
  setFlowField: (v: Partial<ShaderState["flowField"]>) => void;
  setStripes: (v: Partial<ShaderState["stripes"]>) => void;
  setSimplexNoise: (v: Partial<ShaderState["simplexNoise"]>) => void;
  setDither: (v: Partial<ShaderState["dither"]>) => void;
  setImageTexture: (v: Partial<ShaderState["imageTexture"]>) => void;
  setChromaticAberration: (v: Partial<ShaderState["chromaticAberration"]>) => void;
  setAspectRatio: (v: string) => void;
  reset: () => void;
}

export const useShaderStore = create<ShaderState & ShaderActions>((set) => ({
  ...defaults,
  setFlowField: (v) => set((s) => ({ flowField: { ...s.flowField, ...v } })),
  setStripes: (v) => set((s) => ({ stripes: { ...s.stripes, ...v } })),
  setSimplexNoise: (v) => set((s) => ({ simplexNoise: { ...s.simplexNoise, ...v } })),
  setDither: (v) => set((s) => ({ dither: { ...s.dither, ...v } })),
  setImageTexture: (v) => set((s) => ({ imageTexture: { ...s.imageTexture, ...v } })),
  setChromaticAberration: (v) => set((s) => ({ chromaticAberration: { ...s.chromaticAberration, ...v } })),
  setAspectRatio: (v) => set({ aspectRatio: v }),
  reset: () => set(defaults),
}));
