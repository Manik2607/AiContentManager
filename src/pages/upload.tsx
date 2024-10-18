import { useState } from "react";
import { Link } from "react-router-dom";


export default function Uplode() {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
          <h2 className="text-2xl font-bold mb-4">Uplode</h2>
          <form className="w-full">
            <div className="mb-4">
              <label className="block mb-2">File:</label>
              <label className="block mb-2">{file && file.name}</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
                onChange={(e:any) => setFile(e.target.files[0])}
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Uplode
              </button>
              <div className="flex-grow"></div>
              {/* <Link className="px-8 py-1 text-blue-500" to="/register">
                Register now
              </Link> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
