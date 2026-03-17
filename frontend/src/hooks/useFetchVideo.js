import { useEffect, useState } from "react";
import {api} from "../../api/axios";

export const useFetchVideos = ({
  page = 1,
  limit = 10,
  sortBy = "title",
  sortType = "desc",
  userId,
}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/video/get-all-videos?page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}&userId=${userId}`
        );

        setVideos(response.data.data);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page, limit, sortBy, sortType, userId]);

  return { videos, loading, error };
};