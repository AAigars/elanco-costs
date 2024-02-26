"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/applications");
  }, []);

  return <></>;
};

export default Home;
