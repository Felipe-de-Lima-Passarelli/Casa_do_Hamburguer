"use client";

//Next
import { useState } from "react";

//Components
import Button from "./Button";
import Pedido from "./Pedido";

const Pedidos = () => {
  const [arrayColorButton, setArrayColorButton] = useState<boolean[]>([
    true,
    false,
    false,
  ]);

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

  return (
    <main className="text-white mt-10 mx-[23%]">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-4">
          <div onClick={() => switchButton(0)}>
            <Button
              bgColor={`${arrayColorButton[0] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[0] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Pendentes"
              width="w-30"
            />
          </div>
          <div onClick={() => switchButton(1)}>
            <Button
              bgColor={`${arrayColorButton[1] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[1] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Retirados"
              width="w-30"
            />
          </div>
          <div onClick={() => switchButton(2)}>
            <Button
              bgColor={`${arrayColorButton[2] ? "bg-[#F2DAAC]" : ""} border border-[#F2DAAC]`}
              textColor={`${arrayColorButton[2] ? "text-[#161410]" : "text-[#F2DAAC]"}`}
              textButton="Cancelados"
              width="w-30"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Pedido
            id={1}
            name="Odair Michael Bendotti"
            date="27/12/2027"
            orderTime="21:00"
            deliveredTime="21:15"
            total={124.78}
          />
        </div>
      </div>
    </main>
  );
};

export default Pedidos;
