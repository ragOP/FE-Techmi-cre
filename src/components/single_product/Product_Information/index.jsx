export default function ProductInfo() {
  return (
    <div className="w-full mx-auto p-6 font-sans text-gray-800">
      <nav className="border-b pb-3 text-sm text-gray-600 flex space-x-6">
        <p
          href="#"
          className="text-blue-900 font-medium pb-1 cursor-pointer"
        >
          Product Information
        </p>
        <p href="#" className="hover:text-blue-900 cursor-pointer">
          Directions for Use
        </p>
        <p href="#" className="hover:text-blue-900 cursor-pointer">
          FAQs
        </p>
        <p href="#" className="hover:text-blue-900 cursor-pointer">
          Customers Also Bought
        </p>
      </nav>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          The CeraVe Ceramides Moisturising Cream for Dry Skin is a specially
          formulated skincare product designed to replenish dry to very dry
          skin. Developed by dermatologists, it is enriched with essential
          components such as ceramides and hyaluronic acid, which deeply hydrate
          the skin and maintain its health and quality.
        </p>
        <p className="text-gray-700 mt-3 leading-relaxed">
          What makes the CeraVe Moisturising Cream unique is its patented MVE
          technology that ensures a continuous release of hydration throughout
          the day, providing 24-hour moisturisation. This innovative technology
          and the combination of ingredients, protects your skin's natural
          barrier against environmental aggressors, resulting in a significant
          improvement in your skin's health and quality.
        </p>
        <p className="text-gray-700 mt-3 leading-relaxed">
          CeraVe Moisturising Cream is a non-comedogenic product that is
          suitable for use on both the face and body. It does not block pores or
          cause breakouts, making it an ideal choice to hydrate the skin. The
          fragrance-free formula of this cream reduces the risk of skin
          irritation, making it suitable for people with sensitive skin.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
          <li>Infused with patented MVE technology for continuous hydration</li>
          <li>Enriched with marine and botanical complex</li>
          <li>Dermatologist-developed formula</li>
          <li>Non-comedogenic and fragrance-free</li>
          <li>Potent combination of 3 ceramides and hyaluronic acid</li>
          <li>Suitable for both face and body application</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Directions for Use</h2>
        <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
          <li>Cleanse your skin thoroughly.</li>
          <li>
            Take a sufficient amount of CeraVe Moisturising Cream on your
            fingertips.
          </li>
          <li>Gently apply it onto the skin, focusing on dry patches.</li>
          <li>Massage in a circular motion until fully absorbed.</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">Key Benefits</h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          The unique blend of ceramides and hyaluronic acid in CeraVe
          Moisturising Lotion provides deep hydration, making the skin feel more
          supple and refreshed. The patented MVE delivery technology ensures up
          to 24-hour hydration for a healthier and more radiant skin appearance.
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-2">
          <h3 className="font-semibold">
            Is CeraVe Moisturising Cream suitable for all skin types?
          </h3>
          <p className="text-gray-700 mt-2">
            CeraVe Moisturising Cream is specifically designed for dry to very
            dry skin. However, its non-comedogenic and fragrance-free
            formulation makes it suitable for most skin types unless there is a
            specific sensitivity to any of its ingredients.
          </p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">
            Is CeraVe Moisturising Cream suitable for all skin types?
          </h3>
          <p className="text-gray-700 mt-2">
            CeraVe Moisturising Cream is specifically designed for dry to very
            dry skin. However, its non-comedogenic and fragrance-free
            formulation makes it suitable for most skin types unless there is a
            specific sensitivity to any of its ingredients.
          </p>
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">
            Is CeraVe Moisturising Cream suitable for all skin types?
          </h3>
          <p className="text-gray-700 mt-2">
            CeraVe Moisturising Cream is specifically designed for dry to very
            dry skin. However, its non-comedogenic and fragrance-free
            formulation makes it suitable for most skin types unless there is a
            specific sensitivity to any of its ingredients.
          </p>
        </div>
      </section>

      <section className="mt-8 border border-gray-400 p-6 rounded-xl bg-gray-100">
        <h2 className="text-2xl font-semibold">Additional Information</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Country of origin:</span>
        </p>
        <p className="text-gray-500">Spain</p>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">Manufacturer/Marketer:</span>
        </p>
        <p className="text-gray-500">
          L'Oréal India Pvt. Ltd., A-Wing, 8th Floor, Marathon Futurex, NM Joshi
          Marg, Lower Parel, Mumbai, Maharashtra 400013
        </p>
      </section>
    </div>
  );
}
