import React, { useState } from "react";
import Image from "../../../../common/image";
import prescription from "../../../../../assets/solutions/prescription.svg";


const Aboutus = () => {
    const [data, setData] = useState({
        title: "About Us",
        description: "Care Sync is a leading professional cleaning company, known for delivering high-quality services in Delhi NCR and beyond. We offer comprehensive cleaning solutions for both residential and commercial spaces. From deep cleaning to pest control, we ensure your space is spotless, hygienic, and comfortable.",


    });

    return (
        <div className="bg-[rgba(130,200,229,0.2)] lg:h-[27rem] w-full lg:flex-row flex flex-col items-center justify-evenly  ">
            <div className="lg:w-2/5 w-[90%] mx-5 mt-5 text-white flex flex-col ">


                <h1 className="xl:text-4xl lg:text-3xl text-black font-bold mb-4">{data.title}</h1>
                <p className="mb-6 text-black text-lg font-medium">{data.description}</p>

                <button className="text-white bg-[#00008B] shadow-2xl  py-4 text-base  font-semibold w-[150px] rounded-full   ">
                    Book Now
                </button>
            </div>

            <div>
                <Image
                    src={prescription}
                    alt="CareSync Team"
                    css="rounded-2xl xl:h-[25rem] lg:h-[20rem] object-cover"
                />
            </div>
        </div>
    );
};

export default Aboutus;
