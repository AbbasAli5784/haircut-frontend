import { useNavigate } from "react-router-dom";
import Header from "./Header";

const SelectService = () => {
  const services = [
    { id: 1, name: "Haircut " },
    { id: 2, name: "HairCut + Beard" },
    { id: 3, name: "LineUp" },
  ];

  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    

    setTimeout(() => {
      navigate(`/booking/${service.id}`, {
        state: { selectedService: service },
      });
    });
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-slideInRight">
        <div className=" max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Services
            </h2>

            <ul className="mt-5 space-y-4">
              {services.map((service) => (
                <li key={service.id} className="rounded-md shadow-sm">
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default SelectService;
