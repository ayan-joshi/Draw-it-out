import { RxCross1 } from "react-icons/rx";
import { useEffect, useState, useRef } from "react";
import { startDrawing, clearCanvas } from "./utils/canvas";
import Menu from "./components/Menu";
import BgColor from "./components/BgColor";
import { rainbowColors } from "./utils/helpers";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [thickness, setThickness] = useState(10);
  const [color, setColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#B7BABF");
  const [isErasing, setIsErasing] = useState(false); // New state for eraser

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      startDrawing(canvas, color, thickness, bgColor, isErasing); // Pass isErasing state
    }
  }, [bgColor, color, thickness, isErasing]); // Include isErasing in dependencies

  return (
    <>
      <div className="bg-[#d3d5d8] flex flex-col min-w-[100dvw] justify-center gsm:flex-row">
        <div className="gsm:w-[10%] w-[85%] py-8 grid grid-cols-6 vsm:grid-cols-4 gsm:grid-cols-1 gap-2 vsm:gap-4 gsm:gap-2 gsm:py-[5rem] gsm:mb-8 mx-auto">
          {rainbowColors?.map((val, i) => (
            <BgColor
              key={i}
              color={val}
              setBgColor={setBgColor}
              canvas={canvasRef.current}
            />
          ))}
        </div>

        <div className="container w-[90%] gsm:min-h-[100dvh] flex flex-col justify-center items-center gap-[2rem] font-primary m-auto gsm:m-0">
          <Menu
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            isErasing={isErasing} // Pass isErasing state to Menu
            setIsErasing={setIsErasing} // Update isErasing state
            thickness={thickness}
            setThickness={setThickness}
            color={color}
            setColor={setColor}
            canvasRef={canvasRef}
          />
          <canvas
            id="draw"
            className={`whiteboard bg-[#DBDCDF] rounded-[0.6rem] shadow-mdm ${
              isDrawing
                ? "cursor-crosshair"
                : "cursor-default pointer-events-none"
            }`}
            ref={canvasRef}
          ></canvas>
          <div
            className="clearAll bg-[#CBCCCF] p-[1rem] text-[2rem] rounded-[50%] shadow-lg hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              clearCanvas(canvasRef.current, bgColor);
              setIsDrawing(true);
              setIsErasing(false); // Reset isErasing state
            }}
          >
            <RxCross1 />
          </div>
          <h1 className="text-[0.7rem] vvsm:text-[1rem] pb-4">
            Made with &#128157; by{" "}
            <a
              href="https://shubham-s-socials.vercel.app/"
              className="decoration-none font-semibold hover:underline"
            >
              Master Mickey
            </a>
            !
          </h1>
        </div>
      </div>
    </>
  );
}

export default App;
