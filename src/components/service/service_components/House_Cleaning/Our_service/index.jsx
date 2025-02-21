import React, { useState } from "react"

const Services = () => {
  const [services, setServices] = useState([
    {
      title: "BATHROOM CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your space.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "MARBLE POLISHING",
      description:
        "Bring back the shine to your marble floors with expert polishing services.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "SOFA CLEANING",
      description:
        "Expert cleaning to remove stains, odors, and dust, restoring freshness and comfort to your furniture.",
      imageUrl:
        "https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ])

  return (
    <div className=" py-10">
      <div className="flex justify-between items-center xl:w-[75%] w-[90%] mx-auto py-6">
        <div className="">
          <h2 className="xl:text-3xl text-2xl font-bold mb-2">
            Our Services, We Clean It All – Big or Small!
          </h2>
          <p className="xl:text-xl text-lg ">
            Explore our wide range of cleaning services designed for your
            lifestyle
          </p>
        </div>

        <div>
          <button className="bg-gradient-to-r xl:text-xl text-lg from-gray-300 to-blue-200 text-black font-semibold py-2 px-6 rounded-full shadow-md hover:opacity-80 transition">
            Let Us Handle The Dirty Work!
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 gap-6 px-4 xl:w-[75%] w-[90%] xl:h-[70rem] h-[65rem] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative bg-white rounded-3xl shadow-md overflow-hidden"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full  text-white xl:p-4 px-2">
              <h3 className="xl:text-2xl text-xl font-semibold text-[#82C8E5]">
                {service.title}
              </h3>
              <p className="text-sm mb-5 ">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
