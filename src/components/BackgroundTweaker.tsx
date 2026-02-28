import ShaderControls from "./ShaderControls";
import ShaderPreview from "./ShaderPreview";

export default function BackgroundTweaker() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ShaderControls />
      <div className="flex-1 min-w-0">
        <ShaderPreview />
      </div>
    </div>
  );
}
