import GlslCanvas from "glslCanvas";

export default function initGLSLCanvas(props) {
  const {
    fragmentString,
    textures = "",
    pixelRatio = 0.75,
    canvasId = "glsl-canvas",
  } = props;

  const canvas = document.getElementById(canvasId);
  if (canvas) {
    const setCanvasDisplaySize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const setCanvasResolution = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const pixelWidth = Math.floor(rect.width * Number(pixelRatio));
      const pixelHeight = Math.floor(rect.height * Number(pixelRatio));
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    };

    setCanvasDisplaySize();
    setCanvasResolution();

    const sandbox = new GlslCanvas(canvas, {
      pixelRatio: Number(pixelRatio),
    });
    sandbox.load(fragmentString);

    if (textures.length > 0) {
      textures.split(",").forEach((texture, index) => {
        sandbox.setUniform(`u_tex${index}`, `/assets/craft/${texture.trim()}`);
      });
    }

    const rsize = () => {
      setCanvasDisplaySize();
      setCanvasResolution();
      sandbox.resize();
    };
    window.addEventListener("resize", rsize);

    window.addEventListener("astro:after-swap", () => {
      window.removeEventListener("resize", rsize);
    });
  }
};