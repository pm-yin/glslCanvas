import { useEffect, useRef } from "react";
import styles from "./glsl-canvas.module.scss";

type Props = {
  fragmentString: string;
  textures?: string;
  pixelRatio?: number;
  className?: string; // 傳入不同的 container 樣式
  canvasClassName?: string; // 傳入不同的 canvas 樣式
};

interface GLSLSandbox {
  load: (fragmentString: string) => void;
  resize: () => void;
  setUniform: (name: string, value: unknown) => void;
  canvas: HTMLCanvasElement;
}

// 將輔助函式移出元件，避免重複宣告
function setCanvasDisplaySize(
  container: HTMLDivElement,
  canvas: HTMLCanvasElement
) {
  const rect = container.getBoundingClientRect();
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  return rect;
}

function setCanvasResolution(
  canvas: HTMLCanvasElement,
  rect: DOMRect,
  pixelRatio: number
) {
  const pixelWidth = Math.floor(rect.width * pixelRatio);
  const pixelHeight = Math.floor(rect.height * pixelRatio);
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
}

export default function GLSLCanvas({
  fragmentString,
  textures,
  pixelRatio = 0.75,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // 使用 useRef 來存放 sandbox 實例
  const sandboxRef = useRef<GLSLSandbox | null>(null);

  // --- 主 useEffect ---
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !container) return;

    let sandbox = sandboxRef.current;

    // 1. 只在第一次掛載時初始化 glslCanvas
    if (!sandbox) {
      const init = async () => {
        const rect = setCanvasDisplaySize(container, canvas);
        setCanvasResolution(canvas, rect, pixelRatio);

        const { default: GlslCanvas } = await import('glslCanvas');
        sandbox = new GlslCanvas(canvas, { pixelRatio });
        sandboxRef.current = sandbox;

        sandbox.load(fragmentString);
        if (textures) {
          updateTextures(sandbox, textures);
        }
      };
      init();
    } else {
      // 2. 如果實例已存在，只更新 shader
      sandbox.load(fragmentString);
    }

    // 3. 處理 resize
    const handleResize = () => {
      if (!sandboxRef.current) return;
      const rect = setCanvasDisplaySize(container, canvas);
      setCanvasResolution(canvas, rect, pixelRatio);
      sandboxRef.current.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // 可以在此處添加銷毀 sandbox 的邏輯，如果需要的話
    };
  }, [fragmentString, pixelRatio]); // pixelRatio 變更時仍需重新設定解析度

  // --- 更新 Texture 的 useEffect ---
  useEffect(() => {
    const sandbox = sandboxRef.current;
    if (!sandbox || !textures) return;
    updateTextures(sandbox, textures);
  }, [textures]);

  function updateTextures(sandbox: GLSLSandbox, textures: string) {
    textures.split(',').forEach((texture, index) => {
      sandbox.setUniform(`u_tex${index}`, `/assets/craft/${texture}`);
    });
  }

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className={`glslCanvas ${styles.glsl_canvas}`}
      ></canvas>
    </div>
  );
}