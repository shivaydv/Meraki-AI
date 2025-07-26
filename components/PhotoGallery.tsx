"use client";

import axios from "axios";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import Masonry from "react-masonry-css";
import { PhotoCard } from "./PhotoCard";

const PhotoGallery = () => {
  const breakpointColumnsObj = {
    default: 3,
    768: 2,
    500: 1,
  };

  const [Data, setData] = useState<any[]>([]);
  const [Error, setError] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(true);

  const getPost = async () => {
    try {
      const res = axios.get(`/api/all-post`);
      setData((await res).data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {Loading ? (
        <div className="flex h-48 justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="my-masonry-column"
        >
          {Data?.map((item) => (
            <PhotoCard key={item._id} item={item} />
          ))}
        </Masonry>
      )}
      {Error && (
        <div className="flex h-48 justify-center items-center">
          <h1 className="text-3xl">No Post Found</h1>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
