import * as React from "react";
import ChevronDownSvg from "@heroicons/solid/chevron-down.svg";
import cn from "classnames";
import { Api } from "@src/api/Kis";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "@src/components/atoms/LoadingSpinner";
import OfficeBuildingSvg from "@heroicons/outline/office-building.svg";
import { addressToString } from "@src/utils/utils";

interface IBranchesDropdownProps {
  value: boolean | any;
  onChange: any;
}

const BranchesDropdown: React.FunctionComponent<IBranchesDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isDropdownShown, setIsDropdownShown] = React.useState(false);

  const api = new Api();
  let { pathname } = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    api
      .registration_branches()
      .then((response) => setItems(response.data.branches))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative inline-block w-full">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setIsDropdownShown((_) => !isDropdownShown)}
            className={cn(
              "inline-flex justify-between w-full rounded-md active:text-gray-700 text-gray-600 hover:text-gray-500 border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 transition ease-in-out duration-150",
              {
                "active:text-gray-800 text-gray-700 hover:text-gray-500": value,
              },
            )}
          >
            {value ? value.restaurant.name : "Choose branch"}
            <ChevronDownSvg className="-mr-1 ml-2 h-5 w-5" />
          </button>
        </span>
      </div>
      <div
        className={cn(
          "origin-top-right absolute right-0 mt-2 h-64 rounded-md shadow-lg w-full z-10 overflow-scroll",
          { hidden: !isDropdownShown },
        )}
      >
        <div className="rounded-md bg-white shadow-xs" role="menu">
          <div className="py-1">
            {loading ? (
              <LoadingSpinner />
            ) : (
              items.map((item, index) => (
                <div
                  key={`wallet-${index}`}
                  className="group flex flex-col items-start px-4 py-2 text-sm leading-5 cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  role="menuitem"
                  onClick={(_) => {
                    onChange(item);
                    setIsDropdownShown(false);
                  }}
                >
                  <p className="text-lg font-semibold text-gray-600">
                    {item.restaurant.name}
                  </p>
                  <div className="flex space-x-2">
                    <span className="py-0.5 flex space-x-2 rounded-full text-xs font-medium leading-4 bg-cool-gray-100 text-cool-gray-800 capitalize">
                      <OfficeBuildingSvg className="w-4 h-4" />
                      {`${addressToString(item.address)}`}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesDropdown;
