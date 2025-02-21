    import React from "react";
    import Image from "../../common/image";
    import prescription from "../../../assets/solutions/prescription.svg";
    import Shape1 from "../../../assets/solutions/Shape1.svg";
    import Shape2 from "../../../assets/solutions/Shape2.svg";
    import Shape3 from "../../../assets/solutions/Shape3.svg";
    import Shape4 from "../../../assets/solutions/Shape4.svg";
    import Shape5 from "../../../assets/solutions/Shape5.svg";
    import arrow from "../../../assets/solutions/arrow.svg"

    const Solutions = () => {
        const shapes = [Shape1, Shape2, Shape3, Shape4, Shape5];

        return (
            <div className="bg-[#82C8E5] lg:h-[27rem] w-full lg:flex-row flex flex-col items-center justify-evenly py-6 gap-10">
                <div className="lg:w-1/3 w-[90%] mt-5   text-white flex flex-col    gap-y-5">
                    <div className="flex    items-center justify-start gap-1 mb-4">
                        <div className="flex -space-x-2">
                            {shapes.map((shape, index) => (
                                <img
                                    key={index}
                                    src={shape}
                                    alt={`Shape ${index + 1}`}
                                    className="w-8 h-8 rounded-full border border-white"
                                />
                            ))}
                        </div>
                        <p className="text-[#00008B] font-bold">400+ <br /><p className="font-normal text-sm text-slate-50" >Happy Customers</p></p>
                    </div>

                    <h1 className="xl:text-4xl lg:text-3xl text-black font-bold mb-4">CareSync Solutions</h1>
                    <p className="mb-6 text-black  font-medium ">
                        CareSync Solutions is a one-stop platform dedicated to enhancing your lifestyle by combining trusted pharmaceutical care and professional cleaning services. We believe in simplifying everyday needs with quality, reliability, and ease of access.
                    </p>

                    <button className="text-[#00008B] bg-white shadow-2xl lg:py-1 xl:py-2 xl:text-2xl lg:text-xl font-semibold w-[170px] rounded-full flex items-center  justify-center gap-2">
                        About Us <img src={arrow} alt="aroow-right-up" />
                    </button>
                </div>

                <div className="">
                    <Image
                        src={prescription}
                        alt="CareSync Team"
                        css="rounded-2xl xl:h-[25rem] lg:h-[20rem]  object-cover"
                    />
                </div>
            </div>
        );
    };

    export default Solutions;
