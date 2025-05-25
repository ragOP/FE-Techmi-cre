import React from "react"

const Testimonials = ({ testimonialData }) => {
  console.log(testimonialData)
  return (
    <div className="flex flex-wrap justify-center gap-5 xl:gap-8">
      {testimonialData?.map((td) => (
        <div
          key={td?._id}
          className="max-w-[300px] xl:max-w-[330px] bg-white"
          style={{
            boxShadow: "0px 5px 15px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="flex justify-between items-center border-b border-b-[#F5F5F5] px-6 py-4">
            <p className="text-[#0F1030]">{td?.customer_name}</p>
            <img
              src={td?.image}
              alt={td?.customer_name}
              className="h-[40px] w-[40px] rounded-full"
            />
          </div>
          <p className="px-7 pt-6 pb-7 text-[#243858] tracking-wider text-sm xl:text-base">{(td?.message).slice(0, 100) + "..."}</p>
        </div>
      ))}
    </div>
  )
}

export default Testimonials
