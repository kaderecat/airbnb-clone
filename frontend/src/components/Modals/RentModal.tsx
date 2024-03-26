import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categoryArr } from "../Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

interface RentModalProps {
  isOpenRentModal: boolean;
  setOpenRent: React.Dispatch<React.SetStateAction<boolean>>;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = ({ isOpenRentModal, setOpenRent }: RentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");

  console.log(category);

  const onBack = () => {
    if (step === STEPS.CATEGORY) {
      return;
    }

    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (step === STEPS.PRICE) {
      return;
    }

    setStep((prev) => prev + 1);
  };

  let bodyContent = (
    <div className="flex flex-col ">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className=" grid grid-cols-4 md:grid-cols-4 gap-2 max-h[50vh] overflow-y-auto">
        {categoryArr.map((item) => (
          <div key={item.desc} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setValue("category", category, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        isOpen={isOpenRentModal}
        disabled={loading}
        body={bodyContent}
        title="Airbnb your home"
        actionLabel={step === STEPS.PRICE ? "Create" : "Next"}
        setOpen={setOpenRent}
        secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Back"}
        secondaryAction={onBack}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default RentModal;
