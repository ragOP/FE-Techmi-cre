import React, { useState } from "react"

const Searchbox = () => {
  const [checkBoxOptions, setCheckBoxOptions] = useState([
    { name: "Home Cleaning", checked: false },
    { name: "Shoes Cleaning", checked: false },
    { name: "Laundry", checked: true },
    { name: "Ironing", checked: false },
    { name: "Dry Cleaning", checked: false },
  ])

  const handleCheckboxChange = (name) => {
    setCheckBoxOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.name === name ? { ...option, checked: !option.checked } : option
      )
    )
  }

  return (
    <div className="flex justify-center">
      <div
        className="bg-white rounded-[20px] p-5 mx-5"
        style={{
          boxShadow:
            "0px 2px 6px 2px rgba(0, 0, 0, 0.15),0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        }}
      >
        <p className="text-3xl">Request Pickup</p>
        <div className="my-5 flex flex-col lg:flex-row gap-2 lg:gap-5">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="border border-[#4D4D4D80] rounded-full text-[#4D4D4D] px-5 py-2.5 text-sm outline-none"
          />
          <input
            type="text"
            name="number"
            id="number"
            placeholder="Phone Number"
            className="border border-[#4D4D4D80] rounded-full text-[#4D4D4D] px-5 py-2.5 text-sm outline-none"
          />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            className="border border-[#4D4D4D80] rounded-full text-[#4D4D4D] px-5 py-2.5 text-sm outline-none"
          />
          <input
            type="text"
            name="pincode"
            id="pincode"
            placeholder="Pincode"
            className="border border-[#4D4D4D80] rounded-full text-[#4D4D4D] px-5 py-2.5 text-sm outline-none"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div className="flex flex-wrap items-center gap-2 lg:gap-5">
            {checkBoxOptions?.map((cbo) => (
              <div key={cbo.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={cbo.name}
                  id={cbo.name}
                  checked={cbo.checked}
                  onChange={() => handleCheckboxChange(cbo.name)}
                  className="accent-[#82c8e5] h-4 w-4"
                />
                <label htmlFor={cbo.name}>{cbo.name}</label>
              </div>
            ))}
          </div>
          <button className="bg-[#00008B] text-[#F3FAFC] py-2 px-10 rounded-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Searchbox
