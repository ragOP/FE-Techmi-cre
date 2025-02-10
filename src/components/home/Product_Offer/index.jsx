    import React, { useState } from "react";
    import Image from "../../common/image/index";
    import offer1 from "../../../assets/productoffer/offer1.svg";
    import offer2 from "../../../assets/productoffer/offer2.svg";
    import offer3 from "../../../assets/productoffer/offer3.svg";
    import offer4 from "../../../assets/productoffer/offer4.svg";
    import offer5 from "../../../assets/productoffer/offer5.svg";

    const Index = () => {
        const [images] = useState([
            { id: 1, src: offer1, alt: "Offer 1" },
            { id: 2, src: offer2, alt: "Offer 2" },
            { id: 3, src: offer3, alt: "Offer 3" },
            { id: 4, src: offer4, alt: "Offer 4" },
            { id: 5 , src: offer5, alt: "Offer 5" },
        ]);

        return (
            <div className="lg:flex-row justify-center px-6  md:flex-col space-y-2 flex flex-col  items-center md:space-y-4 space-x-3 my-10 ">
                <Image src={images[0].src} alt={images[0].alt} css="rounded-lg xl:w-[35%]  md:w-[50%] md:h-[40vh] w-[96%]   xl:h-[85vh] lg:h-[60vh] " />
                <div className="grid grid-row-2 justify-items-center md:justify-items-start space-y-3 ">
                    <div className="md:flex-row flex flex-col  xl:space-x-6 lg:space-x-3 space-y-2 object   lg:w-[49%]  lg:h-[33vh] md:w-[80%] md:h-[30vh] md:space-x-3  xl:h-[48vh] xl:w-[50%]  " >
                    <Image src={images[1].src} alt={images[1].alt} css="rounded-lg " />
                    <Image src={images[2].src} alt={images[2].alt} css="rounded-lg" />
                    </div>
                    <div className="flex md:flex-row  flex-col xl:space-x-3 xl:w-[59%] space-y-2 h-[26vh]  lg:h-[26vh] lg:space-x-3 md:w-[80%] md:h-[20vh] md:space-x-3  lg:w-[60%] xl:h-[35vh]" >

                    <Image src={images[3].src} alt={images[3].alt} css="rounded-lg" />  
                    <Image src={images[4].src} alt={images[4].alt} css="rounded-lg" />
                    </div>
                </div>
            </div>
        );  
    };

    export default Index;
