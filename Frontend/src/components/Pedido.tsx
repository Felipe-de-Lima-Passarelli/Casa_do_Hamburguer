//Icons
import {
  IconArrowBigDownFilled,
  IconUser,
  IconCalendarFilled,
  IconClock,
  IconClockCheck,
} from "@tabler/icons-react";

//Interface
interface PedidoProps {
  id: number;
  name: string;
  date: string;
  orderTime: string;
  deliveredTime?: string;
  total: number;
}

const Pedido = ({
  id,
  name,
  date,
  orderTime,
  deliveredTime,
  total,
}: PedidoProps) => {
  return (
    <div className="h-44 bg-[#F2DAAC] text-[#161410] rounded-md py-4 px-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">#{id}</p>
          <div className="flex flex-row items-center">
            <select
              className="appearance-none bg-transparent border-none pl-2 pr-2 py-1 font-bold"
              defaultValue="pendente"
            >
              <option value="pendente" disabled>
                Pendente
              </option>
              <option value="retirado">Retirado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <IconArrowBigDownFilled size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2 -ml-1">
          <IconUser size={20} />
          <h2 className="text-sm">{name}</h2>
        </div>
        <div className="flex flex-row items-center gap-2 -ml-1">
          <IconCalendarFilled size={20} />
          <h2 className="text-sm">{date}</h2>
        </div>
        <div className="flex flex-row items-center gap-4 -ml-1">
          <div className="flex flex-row gap-1">
            <IconClock size={20} />
            <h2 className="text-sm">{orderTime}</h2>
          </div>
          <div className="flex flex-row gap-1">
            <IconClockCheck size={20} />
            <h2 className="text-sm">{deliveredTime ? deliveredTime : "-"}</h2>
          </div>
        </div>
        <hr />
        <p className="self-end font-semibold">R${total}</p>
      </div>
    </div>
  );
};

export default Pedido;
