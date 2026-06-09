"use client";

//Next
import Link from "next/link";
import { useEffect, useState } from "react";

//Components
import Button from "./Button";
import ItemMenu from "./ItemMenu";

//Types
import { ProductType } from "@/types/Product";

const Main = () => {
  const [arrayColorButton, setArrayColorButton] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

  const [products, setProducts] = useState<ProductType[]>([]);

  const switchButton = (position: number) => {
    switch (position) {
      case 0:
        setArrayColorButton([true, false, false]);
        break;
      case 1:
        setArrayColorButton([false, true, false]);
        break;
      case 2:
        setArrayColorButton([false, false, true]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const filteredProduct = products.filter(
    (product) =>
      product.category ===
      `${
        (arrayColorButton[0] && "hamburguer") ||
        (arrayColorButton[1] && "bebida") ||
        "porcao"
      }`,
  );

  return (
    <main className="text-white mt-10 mx-[23%] flex-1">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-4">
          <Link href="" onClick={() => switchButton(0)}>
            <Button
              bgColor={`${arrayColorButton[0] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[0] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Hamburguer"
              width="w-30"
            />
          </Link>
          <Link href="" onClick={() => switchButton(1)}>
            <Button
              bgColor={`${arrayColorButton[1] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[1] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Bebidas"
              width="w-30"
            />
          </Link>
          <Link href="" onClick={() => switchButton(2)}>
            <Button
              bgColor={`${arrayColorButton[2] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[2] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Porções"
              width="w-30"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="text-[#F2DAAC] font-semibold text-2xl">
              {(arrayColorButton[0] && "Hamburguer") ||
                (arrayColorButton[1] && "Bebidas") ||
                "Porções"}
            </div>
            {filteredProduct.map((product) => (
              <ItemMenu
                key={product.id}
                id={product.id}
                img={product.img}
                name={product.name}
                description={product.description}
                price={product.price}
                setProducts={setProducts}
              />
            ))}
            {filteredProduct.length === 0 && (
              <p>Não há produtos desta categoria</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
