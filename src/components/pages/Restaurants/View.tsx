import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import OfficeBuildingSvg from "@heroicons/outline/office-building.svg";
import CheckCircleSvg from "@heroicons/solid/check-circle.svg";
import { addressToString } from "@src/utils/utils";
import UserSvg from "@heroicons/outline/user.svg";

interface IRegistrationViewProps {}

const RegistrationView: React.FunctionComponent<IRegistrationViewProps> = (
  props,
) => {
  const api = new Api();
  let { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [item, setItem] = React.useState(null);
  React.useEffect(() => {
    api
      .restaurant(id)
      .then((response) => setItem(response.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoadingContainer loading={loading}>
      {item && (
        <main>
          <div className="bg-white shadow lg:border-t lg:border-cool-gray-200">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <img
                      className="hidden h-14 w-14 rounded-full sm:block object-cover"
                      src={item.avatar}
                      alt=""
                    />
                    <div>
                      <div className="flex items-center">
                        <img
                          className=" h-14 w-14 rounded-full sm:hidden object-cover"
                          src={item.avatar}
                          alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-cool-gray-900 sm:leading-9 sm:truncate">
                          {item.name}
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm leading-5 text-cool-gray-500 font-medium capitalize sm:mr-6">
                          <OfficeBuildingSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" />
                          {item.cuisine}
                        </dd>
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm leading-5 text-cool-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                          <CheckCircleSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                          Verified restaurant
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  <span className="shadow-sm rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-cool-gray-300 text-sm leading-5 font-medium rounded-md text-cool-gray-700 bg-white hover:text-cool-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-cool-gray-800 active:bg-cool-gray-50 transition duration-150 ease-in-out"
                    >
                      Remove
                    </button>
                  </span>
                  <span className="shadow-sm rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
                    >
                      Settings
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Foods
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {item.foods.map((food, index) => (
                  <div
                    key={`food-${index}`}
                    className="bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="bg-cool-gray-50 px-5 py-3 ">
                      <p className="text-base leading-5 font-extrabold text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                        {food.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-cool-gray-900">
                Branches
              </h2>
              <div className="mt-2 flex flex-col space-y-2">
                {item.branches.map((item, index) => (
                  <div
                    key={`branch-${index}`}
                    className="bg-white shadow lg:border-t lg:border-cool-gray-200"
                  >
                    <div className="px-2 sm:px-4 lg:max-w-6xl lg:mx-auto lg:px-6">
                      <div className="py-3 md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <div>
                              <div className="flex items-center">
                                <h1 className="ml-3 text-xl font-bold leading-5 text-cool-gray-900 sm:leading-9 sm:truncate">
                                  {`branch ID = ${item.id}`}
                                </h1>
                              </div>
                              <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                <dt className="sr-only">Company</dt>
                                <dd className="flex items-center text-xs leading-3 text-cool-gray-500 font-medium capitalize sm:mr-6">
                                  <OfficeBuildingSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" />
                                  {addressToString(item.address)}
                                </dd>
                                <dd className="flex items-center text-xs leading-3 text-cool-gray-500 font-medium capitalize sm:mr-6">
                                  <UserSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" />
                                  {item.manager ? item.manager.name : `–`}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                          <span className="shadow-sm rounded-md">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-xs leading-3 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
                              onClick={() =>
                                history.push(`/account/branches/${item.id}`)
                              }
                            >
                              Manage
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}
    </LoadingContainer>
  );
};

export default RegistrationView;
