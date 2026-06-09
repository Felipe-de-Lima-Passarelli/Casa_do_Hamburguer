"use client";

//Next
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

//Provider
import { useUser } from "@/context/UserContext";

//Icons
import {
  IconBox,
  IconLayoutDashboardFilled,
  IconPlus,
  IconLogout2,
  IconGardenCart,
} from "@tabler/icons-react";

//Components
import Cart from "./Cart";
import { useCartItem } from "@/context/CartItemsContext";

const Header = () => {
  const { user, setUser } = useUser();
  const pathName = usePathname();

  const [showCart, setShowCart] = useState<boolean>(false);
  const { cartItems } = useCartItem();

  useEffect(() => {
    const handleAuthUser = async () => {
      const response = await fetch("http://localhost:3000/me", {
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setUser(data);
    };

    handleAuthUser();
  }, [setUser]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        return;
      }

      setUser(null);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  let cartQuantity = 0;

  for (let i = 0; i < cartItems.length; i++) {
    cartQuantity += cartItems[i].quantity;
  }

  return (
    <>
      {showCart && <Cart setShowCart={setShowCart} />}
      <header className="flex flex-row items-center justify-around mt-4 mx-25">
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
        {user === null ? (
          <Link href="/login">
            <button className="bg-[#F2DAAC] py-1 px-6 rounded-md text-[#3E372C] font-semibold cursor-pointer">
              Entrar
            </button>
          </Link>
        ) : (
          <div className="flex flex-row gap-8 items-center text-white">
            {user.admin && (
              <div className="flex flex-row items-center gap-2 text-[#F2DAAC]">
                <div
                  className={`${pathName === "/" && "text-[#161410] bg-[#F2DAAC] border-[#7A5C2E]"} h-8.75 w-8.75 rounded-md border-2 flex flex-row justify-center items-center cursor-pointer`}
                >
                  <Link href="/">
                    <IconBox size={18} />
                  </Link>
                </div>
                <div
                  className={`${pathName === "/pedidos" && "text-[#161410] bg-[#F2DAAC] border-[#7A5C2E]"} h-8.75 w-8.75 rounded-md border-2 flex flex-row justify-center items-center cursor-pointer`}
                >
                  <Link href="/pedidos">
                    <IconLayoutDashboardFilled size={18} />
                  </Link>
                </div>
                <div className="h-8.75 w-8.75 rounded-md border flex flex-row justify-center items-center cursor-pointer">
                  <IconPlus size={18} />
                </div>
              </div>
            )}
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart(!showCart)}
            >
              <IconGardenCart size={18} stroke={2} />
              <p className="absolute flex flex-row justify-center items-center -top-4 -right-2 bg-[#F2DAAC] rounded-full w-5 h-5 text-[#161410]">
                {cartQuantity}
              </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>{user.name}</p>
              <IconLogout2
                size={18}
                stroke={2}
                className="cursor-pointer"
                onClick={() => handleLogout()}
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
