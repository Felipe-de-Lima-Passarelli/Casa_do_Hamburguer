"use client";

//Next
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const cookie = document.cookie;

    if (cookie) {
      const cookies = cookie.split("; ");
      const userCookie = cookies.find((item) => item.startsWith("user="));

      if (userCookie) {
        router.replace("/");
        return;
      }
    }

    setTimeout(() => {
      setIsChecking(false);
    }, 0);
  }, [router]);

  if (isChecking) {
    return <p>Carregando...</p>;
  }

  return <div>{children}</div>;
};

export default PublicRoute;
