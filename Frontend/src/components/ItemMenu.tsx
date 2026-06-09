//Next
import Image from "next/image";

//Icons
import { IconGardenCart } from "@tabler/icons-react";

//Types
import { ProductProps } from "@/types/Product";

//Context
import { useUser } from "@/context/UserContext";

//Utils
import { formatterPrice } from "@/Utils/FormatterPrice";

const ItemMenu = ({
  id,
  name,
  description,
  price,
  img,
  setProducts,
}: ProductProps) => {
  const { user } = useUser();

  const handleDeleteProduct = async (id: string) => {
    try {
      if (!id) {
        console.log("ID não enviado.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro ao realizar a requisição");
        return;
      }

      getProducts();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const newCartItem = async () => {
    try {
      const response = await fetch("http://localhost:3000/create-cart-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="flex flex-row gap-4 items-stretch" id={id}>
      <Image
        src={`/img/${img}`}
        alt={name}
        width={1000}
        height={1000}
        className="w-[30%] rounded-xl"
      />
      <div className="flex flex-col gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row items-center justify-between">
            <div className="font-semibold">{name.toUpperCase()}</div>
            {user?.admin && (
              <p
                className="text-xs uppercase border rounded-md p-1 text-red-500 cursor-pointer"
                onClick={() => handleDeleteProduct(id)}
              >
                Deletar
              </p>
            )}
          </div>
          <div className="opacity-50">{description}</div>
        </div>
        <div className="flex flex-row gap-4 self-end">
          <div className="text-[#F2DAAC] font-semibold">
            {formatterPrice(price)}
          </div>
          <IconGardenCart
            size={18}
            stroke={2}
            className="cursor-pointer"
            onClick={() => newCartItem()}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemMenu;
