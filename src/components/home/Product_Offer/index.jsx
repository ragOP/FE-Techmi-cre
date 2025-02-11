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
            <div className="lg:flex-row     md:flex-col space-y-2 flex flex-col w-full  space-x-3 my-10 ">
                <Image src={images[0].src} alt={images[0].alt} css="rounded-lg w-[25rem]  " />
                <div className="flex flex-col  space-y-3  ">
                    <div className="grid grid-cols-2 space-y-2 lg:space-y-0 space-x-2 w-[35rem]   " >
                    <Image src={images[1].src} alt={images[1].alt} css="rounded-lg  " />
                    <Image src={images[2].src} alt={images[2].alt} css="rounded-lg" />
                    </div>
                    <div className="flex lg:flex-row flex-col space-y-2 lg:space-y-0  space-x-2 w-[18rem]" >

                    <Image src={images[3].src} alt={images[3].alt} css="rounded-lg" />  
                    <Image src={images[4].src} alt={images[4].alt} css="rounded-lg" />
                    </div>
                </div>
            </div>
        );  
    };

    export default Index;
