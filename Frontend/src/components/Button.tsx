//Interface
interface ButtonProps {
  type?: "button" | "submit";
  bgColor: string;
  textColor: string;
  textButton: string;
  width?: string;
}

const Button = ({
  bgColor,
  textColor,
  textButton,
  type = "button",
  width = "w-87.5",
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${width} rounded-md ${bgColor} p-2 mb-2 text-sm ${textColor} placeholder-[#32343E] outline-none font-semibold cursor-pointer`}
    >
      {textButton}
    </button>
  );
};

export default Button;
