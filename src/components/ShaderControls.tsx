import { useShaderStore } from "../stores/shaderStore";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef } from "react";

const ditherPatterns = [
  "bayer2",
  "bayer4",
  "bayer8",
  "clusteredDot",
  "blueNoise",
  "whiteNoise",
] as const;

const aspectOptions = ["16:9", "4:3", "1:1", "free"] as const;
const objectFitOptions = ["cover", "contain", "fill", "scale-down", "none"] as const;

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground font-mono">
          {value.toFixed(2)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-6 h-6 border border-border rounded cursor-pointer bg-transparent p-0"
      />
      <Label>{label}</Label>
      <span className="text-xs text-muted-foreground font-mono ml-auto">
        {value}
      </span>
    </div>
  );
}

function SwitchField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={value} onCheckedChange={onChange} size="sm" />
      <Label>{label}</Label>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-3 mb-3">
      <h3 className="text-base font-bold font-mono uppercase tracking-wider text-primary mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function downloadSnapshot() {
  const preview = document.getElementById("shader-preview");
  if (!preview) return;
  const canvas = preview.querySelector("canvas");
  if (!canvas) return;

  const srcW = canvas.width || canvas.clientWidth;
  const srcH = canvas.height || canvas.clientHeight;
  if (!srcW || !srcH) return;

  const scale = 1920 / srcW;
  const w = 1920;
  const h = Math.round(srcH * scale);

  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(canvas, 0, 0, w, h);
  offscreen.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shader-snapshot.png";
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}

export default function ShaderControls() {
  const ff = useShaderStore((s) => s.flowField);
  const setFF = useShaderStore((s) => s.setFlowField);
  const st = useShaderStore((s) => s.stripes);
  const setSt = useShaderStore((s) => s.setStripes);
  const img = useShaderStore((s) => s.imageTexture);
  const setImg = useShaderStore((s) => s.setImageTexture);
  const sn = useShaderStore((s) => s.simplexNoise);
  const setSn = useShaderStore((s) => s.setSimplexNoise);
  const di = useShaderStore((s) => s.dither);
  const setDi = useShaderStore((s) => s.setDither);
  const ca = useShaderStore((s) => s.chromaticAberration);
  const setCa = useShaderStore((s) => s.setChromaticAberration);
  const aspectRatio = useShaderStore((s) => s.aspectRatio);
  const setAspectRatio = useShaderStore((s) => s.setAspectRatio);
  const scale = useShaderStore((s) => s.scale);
  const setScale = useShaderStore((s) => s.setScale);
  const reset = useShaderStore((s) => s.reset);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImg({ url: reader.result as string });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="w-[300px] shrink-0 bg-background border-r border-border p-4 overflow-y-auto h-full font-sans">
      <h2 className="text-3xl font-display font-bold mb-4">Thinkin' Shader</h2>

      <Section title="FlowField">
        <SliderField label="Detail" value={ff.detail} min={0} max={5} step={0.1} onChange={(v) => setFF({ detail: v })} />
        <SliderField label="Speed" value={ff.speed} min={0} max={5} step={0.1} onChange={(v) => setFF({ speed: v })} />
        <SliderField label="Strength" value={ff.strength} min={0} max={1} step={0.01} onChange={(v) => setFF({ strength: v })} />
      </Section>

      <Section title="Stripes / Image">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex gap-1">
          <Button
            size="xs"
            variant={img.url ? "outline" : "default"}
            onClick={() => setImg({ url: null })}
          >
            Stripes
          </Button>
          <Button
            size="xs"
            variant={img.url ? "default" : "outline"}
            onClick={() => fileInputRef.current?.click()}
          >
            {img.url ? "Change Image" : "Upload Image"}
          </Button>
        </div>
        {img.url ? (
          <>
            <div className="flex flex-col gap-1.5">
              <Label>Object Fit</Label>
              <Select value={img.objectFit} onValueChange={(v) => setImg({ objectFit: v })}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {objectFitOptions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SliderField label="Brightness" value={img.brightness} min={-1} max={1} step={0.01} onChange={(v) => setImg({ brightness: v })} />
            <SliderField label="Contrast" value={img.contrast} min={-1} max={1} step={0.01} onChange={(v) => setImg({ contrast: v })} />
          </>
        ) : (
          <>
            <SliderField label="Balance" value={st.balance} min={0} max={1} step={0.01} onChange={(v) => setSt({ balance: v })} />
            <ColorField label="Color A" value={st.colorA} onChange={(v) => setSt({ colorA: v })} />
            <SliderField label="Speed" value={st.speed} min={-1} max={1} step={0.01} onChange={(v) => setSt({ speed: v })} />
          </>
        )}
      </Section>

      <Section title="SimplexNoise">
        <SwitchField label="Visible" value={sn.visible} onChange={(v) => setSn({ visible: v })} />
        <SliderField label="Balance" value={sn.balance} min={0} max={1} step={0.01} onChange={(v) => setSn({ balance: v })} />
        <ColorField label="Color B" value={sn.colorB} onChange={(v) => setSn({ colorB: v })} />
        <SliderField label="Contrast" value={sn.contrast} min={0} max={2} step={0.01} onChange={(v) => setSn({ contrast: v })} />
        <SliderField label="Speed" value={sn.speed} min={0} max={5} step={0.1} onChange={(v) => setSn({ speed: v })} />
      </Section>

      <Section title="Dither">
        <SwitchField label="Visible" value={di.visible} onChange={(v) => setDi({ visible: v })} />
        <ColorField label="Color A" value={di.colorA} onChange={(v) => setDi({ colorA: v })} />
        <div className="flex flex-col gap-1.5">
          <Label>Pattern</Label>
          <Select value={di.pattern} onValueChange={(v) => setDi({ pattern: v })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ditherPatterns.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <SliderField label="Pixel Size" value={di.pixelSize} min={1} max={20} step={1} onChange={(v) => setDi({ pixelSize: v })} />
      </Section>

      <Section title="Chromatic Aberration">
        <SliderField label="Strength" value={ca.strength} min={0} max={1} step={0.01} onChange={(v) => setCa({ strength: v })} />
        <SliderField label="Angle" value={ca.angle} min={0} max={360} step={1} onChange={(v) => setCa({ angle: v })} />
      </Section>

      <Section title="Aspect Ratio">
        <div className="flex gap-1 flex-wrap">
          {aspectOptions.map((opt) => (
            <Button
              key={opt}
              size="xs"
              variant={aspectRatio === opt ? "default" : "outline"}
              onClick={() => setAspectRatio(opt)}
            >
              {opt}
            </Button>
          ))}
        </div>
      </Section>

      <Section title="Scale">
        <SliderField label="Zoom" value={scale} min={0.5} max={2} step={0.1} onChange={setScale} />
      </Section>

      <div className="flex flex-col gap-2 mt-2">
        <Button onClick={downloadSnapshot} className="w-full">
          Download Snapshot
        </Button>
        <Button onClick={reset} variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
