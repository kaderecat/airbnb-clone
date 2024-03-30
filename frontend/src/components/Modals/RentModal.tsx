import { Suspense, lazy, useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categoryArr } from "../Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";
import Map from "../Map";
import Counter from "../Counter";

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
      location: [50, -0.09],
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
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  // const Map =  lazy(() => import("../Map"));

  console.log(category);
  console.log(location);
  console.log(guestCount);
  console.log(roomCount);
  console.log(bathroomCount);

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

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setValue("location", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }}
        />
        <Suspense>
          <Map center={location.latlng || [50, -0.09]} />
        </Suspense>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) =>
            setValue("guestCount", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) =>
            setValue("roomCount", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) =>
            setValue("bathroomCount", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        />
      </div>
    );
  }

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
        onSubmit={onNext}
      />
    </div>
  );
};

export default RentModal;
