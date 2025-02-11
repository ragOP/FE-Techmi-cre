import Image from "../../../../common/image"

const Aboutus = ({ title, desc, desc2, src }) => {
  return (
    <div className="bg-[rgba(130,200,229,0.2)] lg:h-[27rem] w-full lg:flex-row flex flex-col items-center justify-evenly  ">
      <div className="lg:w-2/5 w-[90%] mx-5 mt-5 text-white flex flex-col ">
        <h1 className="xl:text-4xl lg:text-3xl text-black font-bold mb-4">
          {title}
        </h1>
        <p className="mb-6 text-black lg:text-lg font-medium">{desc}</p>
        <p className="mb-6 text-black lg:text-lg font-medium">{desc2}</p>

        <button className="text-white bg-[#00008B] shadow-2xl  py-4 text-base  font-semibold w-[150px] rounded-full   ">
          Book Now
        </button>
      </div>

      <div>
        <Image
          src={src}
          alt="CareSync Team"
          css="rounded-2xl xl:h-[25rem] lg:h-[20rem] object-cover"
        />
      </div>
    </div>
  )
}

export default Aboutus
