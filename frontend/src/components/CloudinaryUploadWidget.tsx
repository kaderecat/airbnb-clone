/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface WidgetProps {
  value: string;
  onChange: (value: string) => void;
}

const CloudinaryUploadWidget = ({ value, onChange }: WidgetProps) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    //@ts-ignore
    cloudinaryRef.current = window.cloudinary;

    //@ts-ignore

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "diddnz0br",
        uploadPreset: "airbnb-clone",
      },
      function (erorr: unknown, result: { info: { files: { uploadInfo: { secure_url: string; }; }[]; }; }) {
        //@ts-ignore
        if (result.info.files) {
          onChange(result.info.files[0]?.uploadInfo.secure_url);
        }
        console.log(erorr);
        return
      }
    );
    console.log(cloudinaryRef);
  }, [onChange]);

  return (
    <div
      //@ts-ignore
      onClick={() => widgetRef.current.open?.()}
      className=" relative cursor-pointer hover:opacity-70 transition border-dashed  border-2  p-20 
    border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <TbPhotoPlus size={50} />
      <div className="font-semibold text-lg">Click to upload</div>
      {value && (
        <div className="absolute inset-0 w-full h-full">
          <img src={value} className="object-cover w-full h-full" alt="" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploadWidget;
