import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../Input";
import Modal from "./Modal";
import { newRequest } from "../../utills/newRequest";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginModalI {
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
  isOpenLogin: boolean;
}

const LoginModal = ({
  setOpenRegister,
  setOpenLogin,
  isOpenLogin,
}: LoginModalI) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    newRequest
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        setOpenLogin(false);
        toast.success("Logged in succesfully!");
        navigate(0);
      })
      .catch((error) => {
        setError(error);
        toast("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onToggle = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={loading}
        register={register}
        errors={errors}
        required
        serverError={error}
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

      <div className=" text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={isOpenLogin}
      title="Login"
      actionLabel="Login"
      setOpen={setOpenLogin}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
