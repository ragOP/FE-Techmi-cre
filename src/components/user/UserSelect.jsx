import { useQuery } from "@tanstack/react-query";
import { fetchUserDistributors } from "../../pages/cart/helper/fetchUserDistributors";
import { getItem } from "../../utils/local_storage";

const UserSelect = ({ selectedUser, onSelectUser }) => {
  const localStorageRole = getItem("role");

  const distributorsParams = {
    role:
      localStorageRole === "dnd"
        ? "salesperson"
        : localStorageRole === "salesperson"
        ? "salesperson"
        : "dnd",
  };

  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryKey: ["fetch_distributors"],
    queryFn: () => fetchUserDistributors({ params: distributorsParams }),
    select: (data) => data?.response?.data,
  });

  const label =
    localStorageRole === "dnd"
      ? "Select Salesperson"
      : "Select Doctor/Distributor";

  return (
    <div className="mt-2 mb-2 relative">
      <label htmlFor="userSelect" className="block text-md font-semibold mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id="userSelect"
          value={selectedUser || ""}
          onChange={onSelectUser}
          disabled={isLoadingUsers}
          className="block w-full appearance-none px-4 py-3 pr-10 text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 shadow transition-all duration-200"
        >
          <option value="" disabled>
            {isLoadingUsers
              ? `${label} Loading users...`
              : users.length
              ? `Select a ${label}`
              : `No ${label} available`}
          </option>
          {users.map((user) => (
            <option key={user._id} value={user._id} className="text-gray-700">
              {user.name}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 8l3 3 3-3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserSelect;
