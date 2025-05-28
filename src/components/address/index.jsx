import { useEffect, useState } from "react";
import { getAddresses } from "./helper/getAddresses";
import { getItem } from "../../utils/local_storage";
import AddressDialog from "./components/AddressDialog";
import { formatAddress } from "./helper/formatAddress";

const AddressManager = ({ setAddress }) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddressState] = useState({});

  const onOpenAddressDialog = () => setOpenAddress(true);
  const onCloseAddressDialog = () => setOpenAddress(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const userId = getItem("userId");
      const userAddresses = await getAddresses({ id: userId });
      setAddresses(userAddresses);
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find(
        (address) => address.isPrimary === true
      );

      if (defaultAddress) {
        setAddressState(defaultAddress);
        setAddress(defaultAddress); // Update the parent component's address state
      } else {
        setAddressState({});
        setAddress({});
      }
    } else {
      setAddressState({});
      setAddress({});
    }
  }, [addresses, setAddress]);

  return (
    <>
      <div className="mt-2 border-t border-gray-900">
        <div className="flex items-center justify-between pt-4">
          <h3 className="text-lg font-bold mt-2 mb-2">Delivering to</h3>
          <button
            onClick={onOpenAddressDialog}
            className="text-[#C62828] font-medium mt-2 hover:underline"
          >
            {Array.isArray(addresses) && addresses.length > 0
              ? "Change Address"
              : "Add Address"}
          </button>
        </div>
        {address && Object.values(address).some((val) => val) && (
          <div className="p-2 border border-gray-300 rounded-md bg-white shadow-sm max-w-md">
            <p className="font-semibold text-gray-900">
              {address.name}, {address?.pincode}
            </p>
            <p className="text-gray-700">
              Address- {formatAddress(address)}
            </p>
          </div>
        )}
      </div>

      {openAddress && (
        <AddressDialog onClose={onCloseAddressDialog} setAddress={setAddressState} />
      )}
    </>
  );
};

export default AddressManager;
