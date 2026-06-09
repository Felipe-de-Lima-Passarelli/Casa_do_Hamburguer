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

const Page = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!name || !email || !password || !cep) {
        setError("Todass as informações são obrigatórias");
        return;
      }

      if (password !== confirmPassword) {
        setError("As senhas precisam ser iguais");
        return;
      }

      const response = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cep }),
      });

      switch (response.status) {
        case 201:
          setError("");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setCep("");

          router.push("/login");
          break;
        case 400:
          setError("Todas as informações são obrigatórias");
          break;
        case 409:
          setError("E-mail já cadastrado");
          break;
        case 500:
          setError("Tente novamente mais tarde");
        default:
          setError("");
          break;
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PublicRoute>
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <Image
          src="/img/Hamburguer_Logo.png"
          alt="Casa do Hamburguer Logo"
          width={100}
          height={100}
          className="w-30"
          loading="eager"
        />
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome Completo"
            user={name}
            setUser={setName}
          />
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
          <Input
            type="password"
            placeholder="Confirme sua senha"
            user={confirmPassword}
            setUser={setConfirmPassword}
          />
          <Input type="text" placeholder="CEP" user={cep} setUser={setCep} />
          <p className="text-sm font-semibold text-red-500">{error}</p>
          <br />
          <Button
            bgColor="bg-red-900"
            textColor="text-white"
            textButton="Criar conta"
            type="submit"
          />
          <Link href="/login">
            <Button
              bgColor="bg-white"
              textColor="text-red-900"
              textButton="Já tenho uma conta"
            />
          </Link>
        </form>
      </div>
    </PublicRoute>
  );
};

export default Page;
