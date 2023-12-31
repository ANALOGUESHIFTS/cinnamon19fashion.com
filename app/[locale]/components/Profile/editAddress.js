"use client";
import { useEffect, useState, useRef } from "react";

export default function EditAddress({ recentData, cancel, save }) {
  const [opacity, setOpacity] = useState(0);
  const [address, setAddress] = useState([
    {
      label: "First Name",
      value: recentData.firstName,
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      value: recentData.lastName,
      type: "text",
      required: true,
    },
    {
      label: "Phone Number",
      value: recentData.phoneNumber,
      type: "text",
      required: true,
    },
    {
      label: "Additional Phone Number",
      value: recentData.additionalPhoneNumber,
      type: "text",
      required: false,
    },
    {
      label: "Delivery Address",
      value: recentData.deliveryAddress,
      type: "text",
      fullWidth: true,
      required: true,
    },
    {
      label: "Additional Info",
      value: recentData.additionalInfo,
      type: "text",
      fullWidth: true,
      required: false,
    },
    {
      label: "Region",
      value: recentData.region,
      type: "text",
      required: true,
    },
    {
      label: "City",
      value: recentData.city,
      type: "text",
      required: true,
    },
  ]);
  const submitRef = useRef();

  const updateField = (label, newValue) => {
    setAddress(
      address.map((data) => {
        if (data.label !== label) {
          return data;
        } else {
          return { ...data, value: newValue };
        }
      })
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    const result = {};
    address.forEach((data) => {
      result[data.label] = data.value;
    });
    save(result);
  };

  useEffect(() => {
    setOpacity(1);
  }, []);
  return (
    <div
      style={{ zIndex: 5, opacity: opacity }}
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/10 duration-500"
    >
      <div className="min-h-[430px] h-auto max-w-[90%] w-[800px] bg-white rounded-xl pb-4">
        <div className="w-full px-4 h-[50px] flex items-center justify-between  border-b">
          <p className="text-PrimaryBlack/90 font-bold text-base ">
            Edit Address
          </p>
          <button
            onClick={() => cancel()}
            className="text-PrimaryBlack border-none bg-none"
          >
            <i className="fa-solid fa-xmark text-xl text-PrimaryBlack/90"></i>
          </button>
        </div>
        <form
          onSubmit={handleSave}
          action="/"
          method="post"
          className="px-4 py-4 w-full flex flex-wrap gap-x-4 gap-y-4"
        >
          {address.map((data) => {
            return (
              <input
                key={data.label}
                onChange={(e) => updateField(data.label, e.target.value)}
                style={{
                  width: `${data.fullWidth ? "100%" : "calc(50% - 8px)"}`,
                }}
                type={data.type}
                placeholder={data.label}
                value={data.value}
                className="py-2.5 px-2.5 border outline-PrimaryOrange outline-1 text-sm text-PrimaryBlack/80"
                required={data.required}
              />
            );
          })}
          <button
            type="submit"
            ref={submitRef}
            className="-z-10 opacity-0"
          ></button>
        </form>
        <div className="px-4 pt-4 w-full flex justify-end">
          <button
            onClick={() => submitRef.current.click()}
            className="text-white font-bold flex items-center bg-green-600 px-5 py-2 shadow-xl hover:bg-green-600/80 text-xs"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}
