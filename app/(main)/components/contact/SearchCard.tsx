/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { searchState } from "../../store/searchSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { state as nigeriaState } from "locations-ng";

const SearchCard = ({
  search,
  dispatch,
  roboto,
  cardVariants,
  formVariants,
}: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const router = useRouter();
  const states = nigeriaState.all()

  const [formData, setFormData] = useState({
    propertyName: "",
    location: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.append("type", search)
    if (formData.propertyName) params.append("title", formData.propertyName)
    if (formData.location) params.append("location", formData.location)
    if (formData.state) params.append("state", formData.state)

    //Navigate to advanced search with params
    router.push(`/advanced-search?${params.toString()}`)
  }

  return (
    <motion.div
      ref={ref}
      className={`${roboto.className} bg-white rounded-[5px] flex flex-col gap-4 py-12 px-6 shadow-sm`}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-medium leading-[25px] text-[16px]">
        Advanced Search
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 mx-auto text-[14px]">
          <motion.button
            onClick={() => dispatch(searchState("lands"))}
            className={`py-2 px-4 rounded-[5px] cursor-pointer ${
              search === "lands"
                ? "bg-black text-white"
                : "bg-gray-300 border border-gray-400 text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lands
          </motion.button>
          <motion.button
            onClick={() => dispatch(searchState("houses"))}
            className={`py-2 px-4 rounded-[5px] cursor-pointer ${
              search === "houses"
                ? "bg-black text-white"
                : "bg-gray-300 border border-gray-400 text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            House
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {search === "lands" && (
            <motion.form
              onSubmit={handleSearch}
              key="lands"
              className="w-full flex flex-col gap-2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.input
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                placeholder="Property Name"
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              >
                <option value="" disabled>
                  All States
                </option>
                {states.map((st) => (
                  <option key={st.name} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </motion.select>
              <motion.button
                className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </motion.form>
          )}
          {search === "houses" && (
            <motion.form
              onSubmit={handleSearch}
              key="houses"
              className="w-full flex flex-col gap-2"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.input
                type="text"
                placeholder="Property Name"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.input
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              />
              <motion.select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="border border-gray-200 py-2 px-3 rounded-[5px] focus:outline-none focus:bg-gray-100 transition-all duration-500 ease-in-out"
                whileFocus={{ scale: 1.02, borderColor: "#941A1A" }}
              >
                <option value="" disabled>
                  All States
                </option>
                {states.map((st) => (
                  <option key={st.name} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </motion.select>
              <motion.button
                className="bg-black rounded-[5px] text-white w-full py-2 font-medium hover:bg-white hover:border hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchCard;
