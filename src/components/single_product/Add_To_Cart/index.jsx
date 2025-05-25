import { useEffect, useState } from "react";
import securePayment from "../../../assets/single_product/second.png";
import trustedPharmacy from "../../../assets/single_product/first.png";
import genuineProducts from "../../../assets/single_product/third.png";
import protinexBanner from "../../../assets/single_product/last.png";
import { ChevronDown } from "lucide-react";
import CartLoader from "../../loader/CartLoader";
import { getItem } from "../../../utils/local_storage";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDistubtors } from "./helper";

const ProductAddToCart = ({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
  isAddingToCart,
}) => {
  const [role, setRole] = useState("");
  const [distibutorUsers, setDistributorUser] = useState([]);

  const params = {
    role: getItem("role"),
  }

  const { data: users } = useQuery({
    queryKey: ["fetch_distributors"],
    queryFn: () => fetchUserDistubtors({params}),
  });


  useEffect(() => {
    setRole(getItem("role"));
    if(users){
      console.log(users);
      setDistributorUser(users);
    }
  }, [users]);
  return (
    <div className="w-full lg:w-[30%]">
      <div className="mt-2 flex gap-2 text-sm">
        <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded-md">
          Free <span className="text-gray-900">Delivery</span>
        </span>
        {/* <span className="px-2 py-1 bg-blue-50 text-blue-900 rounded-md">
          50% OFF <span className="text-gray-900">on SFD Card</span>
        </span> */}
      </div>
      {/* <p className="text-sm text-gray-600 mt-2">
        Get it delivered by{" "}
        <span className="text-blue-900 font-semibold">10pm, Today</span>
      </p> */}
      {/* <p className="text-xs text-gray-900 mt-1">
        Delivering to: 122019, Jupiter
      </p> */}

      {(role === "dnd" || role === "salesperson") && (
        <>
          <label className="block text-sm mt-3 text-gray-500">
            {role === "dnd" ? 'Select Your SalesPerson': 'Select Your Doctor/Distrubutor'}
          </label>
          <div className="relative mt-1">
            <select
              className="border-2 border-gray-900 rounded-lg px-3 py-2 w-full bg-gray-100 appearance-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {distibutorUsers.length > 0 && distibutorUsers.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user?.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </>
      )}

      <div className="relative mt-3">
        <select
          className="border-2 border-gray-900 rounded-lg px-3 py-2 w-full bg-gray-100 appearance-none"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

      <button
        disabled={isAddingToCart}
        onClick={handleAddToCart}
        className="w-full mt-4 border-2 border-blue-900 text-blue-900 rounded-3xl py-2"
      >
        {isAddingToCart ? (
          <div className="my-1">
            <CartLoader />
          </div>
        ) : (
          "Add To Cart"
        )}
      </button>
      <button onClick={() => console.log("Buy")} className="w-full mt-2 bg-blue-900 text-white rounded-3xl py-3 ">
        Buy Now
      </button>

      <div className="flex justify-around items-center mt-5 text-xs text-center text-blue-700 gap-2">
        <div>
          <img
            src={securePayment}
            alt="Secure Payment"
            className="w-16 mx-auto"
          />
          <p className="text-sm">Secure Payment</p>
        </div>
        <div>
          <img
            src={trustedPharmacy}
            alt="Trusted Pharmacy"
            className="w-20 mx-auto"
          />
          <p className="text-sm -mt-2">India's Most Trusted Pharmacy</p>
        </div>
        <div>
          <img
            src={genuineProducts}
            alt="Genuine Products"
            className="w-16 mx-auto"
          />
          <p className="text-sm">Genuine Products</p>
        </div>
      </div>

      <img
        src={protinexBanner}
        alt="Protinex Offer"
        className="w-full rounded-lg mt-4"
      />
    </div>
  );
};

export default ProductAddToCart;
