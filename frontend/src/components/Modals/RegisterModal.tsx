import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import Input from "../Input";
import Heading from "../Heading";

interface RegisterModalI {
  isOpenReg?: boolean;
  setOpenReg: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterModal = ({
  isOpenReg,
  setOpenReg,
  setOpenLogin,
}: RegisterModalI) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    console.log(data);

    setTimeout(() => {
      setOpenReg(false);
      setLoading(false);
    }, 3000);
  };

  const onToggle = () => {
    setOpenLogin(true);
    setOpenReg(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className=" text-neutral-800 cursor-pointer  hover:underlin "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        body={bodyContent}
        isOpen={isOpenReg}
        disabled={loading}
        setOpen={setOpenReg}
        onSubmit={handleSubmit(onSubmit)}
        title="Register"
        actionLabel="Register"
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
