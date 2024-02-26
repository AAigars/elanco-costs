import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const useRawData = () => {
  const { data, error, isLoading } = useSWR(
    "https://engineering-task.elancoapps.com/api/raw",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useRawData;
