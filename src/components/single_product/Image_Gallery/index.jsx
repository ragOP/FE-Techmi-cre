import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
// import ReactImageMagnify from "react-image-magnify";

const ImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product?.images[0]);
    }
  }, [product]);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 w-full lg:w-[40%] relative">
      <div className="flex flex-row items-center justify-center lg:flex-col lg:items-start gap-2 mt-2 lg:justify-start">
        <ChevronUp className="w-8 h-8 ml-4 text-gray-500 cursor-pointer lg:block hidden" />
        <ChevronLeft className="w-8 h-8 ml-4 text-gray-500 cursor-pointer lg:hidden block" />
        {product?.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 cursor-pointer rounded-lg border ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
        <ChevronRight className="w-8 h-8 ml-0 lg:ml-4 text-gray-500 cursor-pointer lg:hidden block" />
        <ChevronDown className="w-8 h-8 ml-0 lg:ml-4 text-gray-500 cursor-pointer hidden lg:block" />
      </div>
      <div className="w-full lg:w-[82%] h-96 rounded-lg">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-full rounded-lg"
        />
        {/* {selectedImage && (
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Product",
                isFluidWidth: true,
                src: selectedImage,
              },
              largeImage: {
                src: selectedImage,
                width: 1200,
                height: 2500,
              },
              enlargedImageContainerDimensions: {
                width: "150%",
                height: "150%",
              },
              enlargedImageContainerStyle: {
                position: "absolute",
                top: "0",
                left: "100%",
                zIndex: 10,
                backgroundColor: "white",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default ImageGallery;
