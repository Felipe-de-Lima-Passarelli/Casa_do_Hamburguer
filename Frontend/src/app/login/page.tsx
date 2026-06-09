"use client";

//Next
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

//Components
import PublicRoute from "@/components/PublicRoute";
import Input from "@/components/Input";
import Button from "@/components/Button";

//Provider
import { useUser } from "@/context/UserContext";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setUser } = useUser();

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("E-mail e senha são obrigatórios");
        setEmail("");
        setPassword("");
        return;
      }

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      switch (response.status) {
        case 200:
          setError("");
          const data = await response.json();
          router.push("/");
          setUser(data);
          break;

        case 400:
          setError("E-mail e senha são obrigatórios.");
          break;

        case 401:
          setError("Credenciais inválidas.");
          break;

        case 404:
          setError("Usuário não encontrado.");
          break;

        case 500:
          setError("Erro no servidor.");
          break;

        default:
          setError("Erro desconhecido.");
          break;
      }
    } catch (error) {
      console.log(error);
      return;
    }

    setPassword("");
  };

  return (
    <PublicRoute>
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <Link href="/">
          <Image
            src="/img/Hamburguer_Logo.png"
            alt="Casa do Hamburguer Logo"
            width={100}
            height={100}
            className="w-30"
            loading="eager"
          />
        </Link>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            user={email}
            setUser={setEmail}
          />
          <Input
            type="password"
            placeholder="Senha"
            user={password}
            setUser={setPassword}
          />
          <p className="text-sm font-semibold text-red-500">{error}</p>
          <br />
          <Button
            bgColor="bg-red-900"
            textColor="text-white"
            textButton="Login"
            type="submit"
          />
          <Link href="/cadastro">
            <Button
              bgColor="bg-white"
              textColor="text-red-900"
              textButton="Não tenho uma conta"
            />
          </Link>
        </form>
      </div>
    </PublicRoute>
  );
};

export default Page;
