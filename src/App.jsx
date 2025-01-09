import { useState } from "react";
import QrCreator from "qr-creator";
import Spinner from "./Spinner.jsx";

let flag = 0,
  qrcode;
function App() {
  // useState
  const [value, setValue] = useState("");
  const [radius, setradius] = useState("0.0");
  const [ecLevel, setecLevel] = useState("H");
  const [background, setbackground] = useState("#000000");
  const [size, setsize] = useState("150");
  const [alert, setalert] = useState("");
  const [qr, setqr] = useState("");
  const [buttonvisibility, setbutton] = useState(false);
  const [spinnervisbility, setspinner] = useState(false);
  const [disabled,setdisabled]=useState(false)

  // image generate function
  function generate() {
    if (value != "" && flag == 0) {
      setalert("");
      setspinner(true);
      const set_interval = setInterval(() => {
        QrCreator.render(
          {
            text: value,
            radius: radius,
            ecLevel: ecLevel,
            fill: background,
            background: null,
            size: size,
          },
          document.getElementById("qrcode")
        );
        setbutton(true);
        setspinner(false);
        clearInterval(set_interval);
      }, 2000);
      setValue("");
      setdisabled(true)
      flag = 1;
      
    } else {
      setalert("please enter the url !");
    }
  }

  // image download function
  function download() {
    qrcode = document.querySelector("canvas");
    const dataurl = qrcode.toDataURL("image/png");
    setqr(dataurl);
  }
  return (
    <>
      <div className="md:flex md:justify-center md:items-center min-h-screen mb-14 mt-28 md:mt-10">
        <div className="text-center">
          <div>
            <h1 className="text-white font-sans uppercase md:font-extrabold font-[1000] md:text-7xl text-3xl mb-12 first-letter:text-black">
              qr code generator
            </h1>
          </div>
          <div className="flex justify-center items-center ">
            <div>
              <input
                className="bg-slate-100 md:w-80 md:h-10 w-56 h-10 text-black rounded-l-lg focus:outline-none pl-5 font-medium text-lg font-mono placeholder:font-sans placeholder:text-base"
                type="text"
                onChange={(event) => setValue(event.target.value)}
                value={value}
                placeholder="Paste a url here"
                disabled={disabled}
              />
            </div>
            <div>
              <button
                className=" hover:bg-slate-800 bg-black text-white h-10 w-28 rounded-r-lg font-mono font-semibold capitalize md:text-lg"
                onClick={generate}
                disabled={disabled}
              >
                generate
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center  gap-3 mt-6">
              <label
                htmlFor=""
                className="text-white font-sans uppercase font-medium md:text-lg"
              >
                size :
              </label>
              <input
                id="default-range"
                type="range"
                value={size}
                min={128}
                max={528}
                onChange={(event) => setsize(event.target.value)}
                className=" h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <label
                htmlFor=""
                className="text-white font-sans uppercase font-medium md:text-lg"
              >
                {size}px
              </label>
            </div>
          </div>
          <div className="md:flex md:justify-center md:items-center  md:gap-10 mt-6 flex-wrap justify-center items-center">
            <div className="md:flex md:justify-center md:items-center md:gap-3 mt-3 flex justify-center items-center gap-3">
              <label
                htmlFor=""
                className="text-white font-sans uppercase font-medium md:text-lg"
              >
                qR background :
              </label>
              <input
                type="color"
                className=" w-9 h-9 md:w-10 md:h-10 rounded-lg"
                onChange={(event) => setbackground(event.target.value)}
              />
            </div>
            <div className="md:flex md:justify-center md:items-center md:gap-3 mt-3 flex justify-center items-center gap-3">
              <label
                htmlFor=""
                className="text-white font-sans uppercase font-medium md:text-lg"
              >
                qR radius :
              </label>
              <select
                name=""
                id=""
                onChange={(event) => setradius(event.target.value)}
                className="text-slate-100  hover:bg-slate-800 bg-black uppercase rounded-lg  text-center font-medium  text-base md:w-16 md:h-10 w-16 h-8 focus:outline-none"
              >
                <option value="0.0">0.0</option>
                <option value="0.1">0.1</option>
                <option value="0.2">0.2</option>
                <option value="0.3">0.3</option>
                <option value="0.4">0.4</option>
                <option value="0.5">0.5</option>
              </select>
            </div>
            <div className="md:flex md:justify-center md:items-center md:gap-3 mt-3 flex justify-center items-center gap-3">
              <label
                htmlFor=""
                className="text-white font-sans uppercase font-medium md:text-lg"
              >
                qR ec level :
              </label>{" "}
              <select
                name=""
                id=""
                onChange={(event) => setecLevel(event.target.value)}
                className="text-slate-100 hover:bg-slate-800 bg-black uppercase rounded-lg  text-center text-sm  md:text-base md:w-24 md:h-10 w-16 h-8 font-medium focus:outline-none"
              >
                <option value="H">high</option>
                <option value="Q">quartile</option>
                <option value="M">medium</option>
                <option value="L">low</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <h3 className="text-white font-sans capitalize font-medium text-lg ">
              {alert}
            </h3>
          </div>
          <div
            className="flex justify-center items-center mt-5"
            id="qrcode"
          ></div>
          <div className="mt-7 flex justify-center items-center gap-6">
            <div>
              {buttonvisibility && (
                <a
                  className=" text-white h-10 w-28 rounded-lg font-mono font-semibold capitalize md:text-lg pt-2 pb-2 pl-3 pr-3  hover:bg-slate-800 bg-black"
                  onClick={download}
                  href={qr}
                  download={"qrcode.png"}
                >
                  download
                </a>
              )}
            </div>
            <div>
              {buttonvisibility && (
                <a
                  className="bg-slate-100 text-black h-10 w-28 rounded-lg font-mono font-semibold capitalize md:text-lg pt-2 pb-2 pl-3 pr-3 hover:bg-slate-200"
                  href="index.html"
                >
                  re-generate
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center">
        <p className="font-sans font-semibold md:text-base text-sm text-white capitalize mb-9">
          made with &#10084; by abhiraj
        </p>
      </div>
      <div>{spinnervisbility && <Spinner />}</div>
    </>
  );
}

export default App;
