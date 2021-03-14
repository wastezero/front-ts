import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
interface IRestaurantListProps {}

const RestaurantCard: React.FC<{ item: any }> = ({ item }) => {
  let { pathname } = useLocation();
  return (
    <Link
      to={`${pathname}/${item.id}`}
      className="bg-white overflow-hidden shadow rounded-lg h-52 flex flex-col"
    >
      <img
        width="100%"
        className="rounded-top h-40 object-cover"
        src={item.avatar}
        alt=""
      />
      <div className="bg-cool-gray-50 px-5 py-3 ">
        <p className="text-base leading-5 font-extrabold text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
          {item.name}
        </p>
      </div>
    </Link>
  );
};

const RestaurantList: React.FunctionComponent<IRestaurantListProps> = (
  props,
) => {
  const api = new Api();
  let { pathname } = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    api
      .restaurants()
      .then((response) => setItems(response.data.restaurants))
      .finally(() => setLoading(false));
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <main>
        <div className="">
          <div className="w-full">
            <div className="flex px-4 sm:px-6 lg:px-8 py-4 bg-white">
              <h3 className="text-xl font-semibold font-display text-gray-900">
                Restaurants
              </h3>
              <Link
                to={`${pathname}/create`}
                className="text-sm bg-transparent ml-auto cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Create
              </Link>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
              {items.map((item, index) => (
                <RestaurantCard item={item} key={`restaurant-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </LoadingContainer>
  );
};

export default RestaurantList;
