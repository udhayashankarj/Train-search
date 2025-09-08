import { useState } from "react";
import { useTrainsStore } from "../stores/useTrainsStore.js";
import { Loader } from "lucide-react";
import {SearchInput} from "../components/SearchInput.jsx"
import { Path } from "../components/Path.jsx";

const Trains = () => {
  const [formData, setFormData] = useState({
    sourcePoint: "",
    destinationPoint: "",
    change: 0,
  });
  const {search, loading,paths}=useTrainsStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    search(formData);
  };
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Search trains
        </h1>
        <div className="flex items-center gap-2">
          {/* Input Field */}
          <div className="relative flex-1">
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="sourcePoint"
                  className="text-sm font-medium text-gray-300"
                >
                  Source Point
                </label>
                <div className="inline mt-1 relative rounded-md shadow-sm">
                  <SearchInput
                    id="sourcePoint"
                    value={formData.sourcePoint}
                    onChange={(newValue) =>
                      setFormData({ ...formData, sourcePoint: newValue })
                    }
                    placeholder="e.g., New Delhi"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="destinationPoint"
                  className="text-sm font-medium text-gray-300"
                >
                  Destination Point
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <SearchInput
                    id="destinationPoint"
                    value={formData.destinationPoint}
                    onChange={(newValue) =>
                      setFormData({ ...formData, destinationPoint: newValue })
                    }
                    placeholder="e.g., Mumbai Central"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="change"
                  className="block text-sm font-medium text-gray-300"
                >
                  Maximum Interchange
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="change"
                    type="number"
                    required
                    min="0"
                    value={formData.change}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        change: Math.max(0, e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className=" flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader
                      className="mr-2 h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                    Loading...
                  </>
                ) : (
                  <>
                    {/* <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" /> */}
                    Search
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="m-4 bg-black-900 rounded-lg divide-y divide-gray-100">
          {paths?.map((path) => (
            <Path path={path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Trains;
