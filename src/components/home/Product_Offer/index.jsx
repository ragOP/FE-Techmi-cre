import React from "react";
import offer1 from "../../../assets/productoffer/offer1.svg";
import offer2 from "../../../assets/productoffer/offer2.svg";
import offer3 from "../../../assets/productoffer/offer3.svg";
import offer4 from "../../../assets/productoffer/offer4.svg";
import offer5 from "../../../assets/productoffer/offer5.svg";

const Index = () => {
    const images = [
        { id: 1, src: offer1, alt: "Offer 1" },
        { id: 2, src: offer2, alt: "Offer 2" },
        { id: 3, src: offer3, alt: "Offer 3" },
        { id: 4, src: offer4, alt: "Offer 4" },
        { id: 5, src: offer5, alt: "Offer 5" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            {/* Large Featured Image */}
            <div className="lg:col-span-1">
                <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="rounded-lg w-full h-full max-h-[500px] object-cover"
                />
            </div>

            {/* Right Side Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                {images.slice(1).map((image) => (
                    <div key={image.id} className="w-full h-full">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="rounded-lg w-full h-full max-h-[240px] object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
