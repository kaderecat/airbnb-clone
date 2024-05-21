import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput = ({
  onClick,
  selected,
  label,
  icon: Icon,
}: CategoryInputProps) => {
  return (
    <div
      className={`rounded-xl border-2 p-2 flex flex-col gap-1 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
      onClick={() => onClick(label.toLocaleLowerCase())}
    >
      <Icon size={20} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
