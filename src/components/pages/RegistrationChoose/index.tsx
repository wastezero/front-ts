import * as React from "react";
import { Link } from "react-router-dom";
import LogoImageUrl from "@src/assets/img/logo.png";
import RestaurantImageUrl from "@src/assets/img/restaurant.png";
import ManagerSvg from "@heroicons/manager_illustration.svg";

interface IRegistrationChooseProps {}

const RegistrationChoosePage: React.FunctionComponent<IRegistrationChooseProps> = (
  props,
) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src={LogoImageUrl}
          alt="Workflow"
        />
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          WasteZero
        </h2>
      </div>
      <div className="mt-8  grid grid-cols-12">
        <div className="col-start-4 col-span-6">
          <div className="grid grid-cols-2 divide-x divide-gray-400 cursor-pointer">
            <Link
              to={`/register/restaurant`}
              className="flex flex-col bg-white hover:bg-gray-100 items-center justify-center py-8 px-4 shadow sm:px-10 rounded-l-lg"
            >
              <img className="w-64 h-64" src={RestaurantImageUrl} />
              <p className="mt-2 text-xl font-bold">Register Your Restaurant</p>
            </Link>
            <Link
              to={`/register/manager`}
              className="flex flex-col bg-white hover:bg-gray-100 items-center justify-center py-8 px-4 shadow sm:px-10 rounded-r-lg"
            >
              <ManagerSvg className="w-64 h-64" />
              <p className="mt-2 text-xl font-bold">Register As a Manager</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChoosePage;
