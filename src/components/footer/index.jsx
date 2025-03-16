import React from "react";
import logo from "../../assets/navbar/Logo.svg";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({footerConfig}) => {
  const data = {
    data1: {
      icons: [
        { id: 1, icon: <FaFacebook /> },
        { id: 2, icon: <FaTwitter /> },
        { id: 3, icon: <FaInstagram /> },
        { id: 4, icon: <FaLinkedin /> },
      ],
    },
    data2: {
      information: [
        { id: 1, label: "About us", link: "#" },
        { id: 2, label: "Delivery Information", link: "#" },
        { id: 3, label: "Privacy Policy", link: "#" },
        { id: 4, label: "Sales", link: "#" },
        { id: 5, label: "Terms & Conditions", link: "#" },
      ],
    },
    data3: {
      account: [
        { id: 1, label: "Dashboard", link: "#" },
        { id: 2, label: "My orders", link: "#" },
        { id: 3, label: "Account details", link: "#" },
        { id: 4, label: "Returns", link: "#" },
        { id: 5, label: "Wishlist", link: "#" },
      ],
    },
  };

  const handleCheckLink = (id) => {
    switch (id) {
      case 1:
        return footerConfig?.facebookLink;
      case 2: 
        return footerConfig?.twitterLink;
      case 3:
        return footerConfig?.instagramLink;
      case 4:
        return footerConfig?.linkedInLink;
      default:
        return null;
    }
  }

  return (
    <footer className="bg-[#FBF6F1E5] py-10 px-6 text-sm  text-gray-800 mt-20">
      <div className="max-w-[90%] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-y-6 lg:space-x-8 lg:place-items-center ">
        <div className="flex flex-col gap-y-7">
          <div className="flex items-center gap-1.5">
            <img src={footerConfig?.logo} alt="" className="h-[60px] w-[60px]" />
            <p className="text-[#1C0547] font-semibold text-xl leading-none">
              <span className="text-[#00008B]">Lo</span>
              <span className="text-[#1C0547]">go</span>
              <br />
              <span className="text-[#1C0547]">Ip</span>
              <span className="text-[#00008B]">sum</span>
            </p>
          </div>
          <p className="text-base">
            {footerConfig?.address}
          </p>
          <a href={footerConfig?.mapLink} className="text-blue-600 underline">Show on map</a>
          <div className="flex gap-x-4">
            {data.data1.icons.map((item) => (
              <div key={item.id} className="text-2xl text-blue-600">
                <a href={handleCheckLink(item.id)} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-8 ">
          <h3 className="font-bold text-xl text-blue-900">Need help</h3>
          <p className="font-bold lg:text-lg xl:text-2xl text-blue-900">{footerConfig?.phoneNumber}</p>
          <p className="text-base ">{footerConfig?.timming}</p>
          <a href={`mailto:${footerConfig?.email}`} className="text-blue-600">✉ {footerConfig?.email}</a>
        </div>

        <div className="flex flex-col gap-y-5 ">
          <h3 className="font-bold xl:text-3xl lg:text-xl text-lg text-blue-900">Information</h3>
          <ul className="space-y-2 text-base xl:text-lg">
            {data.data2.information.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="hover:text-blue-600">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-y-5 ">
          <h3 className="font-bold xl:text-3xl lg:text-xl  text-lg text-blue-900">Account</h3>
          <ul className="space-y-2  text-base xl:text-lg">
            {data.data3.account.map((item) => (
              <li key={item.id}>
                <a href={item.link} className="hover:text-blue-600">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
