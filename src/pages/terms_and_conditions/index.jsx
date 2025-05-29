import { useQuery } from "@tanstack/react-query";
import { getTermsCondition } from "./helper/getTermsCondition";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const TermsAndConditions = () => {
  const { data: termsRes = {}, isLoading } = useQuery({
    queryKey: ["terms"],
    queryFn: getTermsCondition,
  });

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (termsRes &&
        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: termsRes?.terms_and_conditions }}
        />
      )}
    </div>
  );
};

export default TermsAndConditions;
