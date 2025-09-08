import { create } from "zustand";
import axios from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useTrainsStore = create((set, get) => ({
  paths: null,
  loading: false,
  search: async ({ sourcePoint, destinationPoint, change }) => {
    set({ loading: true });
    console.log(sourcePoint, destinationPoint, change);
    try {
      const res = await axios.get("train/search", {
        params: {
          sourcePoint,
          destinationPoint,
          change,
        },
      });
      console.log(res.data.allPaths);
      set({ paths: res.data.allPaths, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An error occurred");
    }
  },
}));
