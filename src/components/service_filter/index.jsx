export default function ServiceFilter({ filterCategories }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl drop-shadow-xl border-2 container mx-auto mb-10">
      <h2 className="text-3xl font-semibold text-start mb-4">
        Let’s Make Your Home Sparkle – Contact Us!
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Name"
          className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none"
        />
        {filterCategories && filterCategories.length > 0 && (
          <select className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none">
            <option>Select Your Service</option>
            {filterCategories.map((category) => (
              <option key={category._id}>{category.name}</option>
            ))}
          </select>
        )}
        <select className="flex-1 px-4 py-2 border-2 rounded-full focus:outline-none">
          <option>Select Your Package</option>
          <option>Premium Care</option>
          <option>Expert Cleaning</option>
          <option>Standard Laundry</option>
        </select>
      </div>
      <button className="mt-4 w-full bg-blue-900 text-white py-3 rounded-full text-center font-semibold flex justify-center items-center gap-2">
        Book Your Cleaning
        <span className="text-lg">🧹</span>
      </button>
    </div>
  );
}
