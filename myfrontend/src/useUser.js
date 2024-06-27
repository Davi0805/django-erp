import useSWR from "swr";
import axiosConfig from "./axiosConfig";

// Função fetcher que utiliza axiosConfig para fazer as requisições
const fetcher = (url) => axiosConfig.get(url).then((res) => res.data);

export const useUser = () => {
  const { data, error } = useSWR("/api/user/", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
