import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  disabled?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  disabled,
  setOpen,
  isOpen,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }
    setShowModal(false);

    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-neutral-800/70 z-50 overflow-x-hidden overflow-y-auto">
      <div className="relative w-full md:w-3/4 lg:w-3/6 xl:w-2/5 my-6 h-full lg:h-auto md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            showModal ? "translate-y-0" : "translate-y-full"
          }
            ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div className=" translate h-full lg:h-auto md:h-auto border-0  rounded-lg  shadow-lg  relative  flex  flex-col   w-full   bg-white  outline-none  focus:outline-none">
            <div className=" flex  items-center  p-6 rounded-t justify-center relative border-b-[1px] ">
              <button
                className="p-1 border-0  hover:opacity-70 transition absolute left-9"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
