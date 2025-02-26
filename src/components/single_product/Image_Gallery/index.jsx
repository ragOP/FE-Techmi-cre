import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ImageGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (product) {
      setSelectedImage(product?.images[0]);
    }
  }, [product]);
  return (
    <div className="flex gap-1 w-[40%]">
      <div className="flex flex-col gap-2 mt-2 w-full">
        <ChevronUp className="w-8 h-8 ml-4 text-gray-500 cursor-pointer" />
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
        <ChevronDown className="w-8 h-8 ml-4 text-gray-500 cursor-pointer" />
      </div>
      <img
        src={selectedImage}
        alt="Product"
        className="w-[82%] h-96 rounded-lg"
      />
    </div>
  );
};

export default ImageGallery;
