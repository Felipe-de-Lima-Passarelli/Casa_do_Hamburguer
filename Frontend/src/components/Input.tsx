//Next
import { Dispatch, SetStateAction } from "react";

//Interface
interface InputProps {
  type: string;
  placeholder: string;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
}

const Input = ({ type, placeholder, user, setUser }: InputProps) => {
  return (
    <input
      type={type}
      className="w-87.5 rounded-md bg-white p-2 mb-2 text-sm text-[#32343E] placeholder-[#32343E] outline-none"
      placeholder={placeholder}
      value={user}
      onChange={(e) => setUser(e.target.value)}
    ></input>
  );
};

export default Input;
