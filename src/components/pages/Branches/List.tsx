import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import ItemsTable from "@src/components/organisms/ItemsTable";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import EyeSvg from "@heroicons/outline/eye.svg";
import OfficeBuildingSvg from "@heroicons/outline/office-building.svg";
import { addressToString } from "@src/utils/utils";
import ItemsListLayout from "@src/components/organisms/ItemsListLayout";
export interface IRestaurantListProps {}

export function BranchList(props: IRestaurantListProps) {
  const api = new Api();
  const [loading, setLoading] = React.useState(true);
  let { pathname } = useLocation();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    api.branches().then((response) => {
      setLoading(false);
      setItems(response.data.branches);
    });
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <ItemsListLayout title="Branches" createRoute={`${pathname}/create`}>
        <ItemsTable
          columns={[
            {
              title: "ID",
              content: (item) => (
                <Link
                  to={`${pathname}/${item.id}`}
                  className="inline-flex space-x-2 items-center justify-between group"
                >
                  <p className="text-sm leading-5 text-gray-700 group-hover:text-cool-gray-900">
                    {item.id}
                  </p>
                  <EyeSvg className="w-4 h-4 text-gray-500 group-hover:text-cool-gray-900" />
                </Link>
              ),
            },
            {
              title: "Address",
              content: (item) => (
                <dd className="flex items-center text-sm leading-5 text-cool-gray-500 font-normal capitalize">
                  <OfficeBuildingSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-cool-gray-400" />
                  {addressToString(item.address)}
                </dd>
              ),
            },
            {
              title: "Manager",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {item.manager?.name}
                </p>
              ),
            },
            {
              title: "Restaurant",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {item.restaurant?.name}
                </p>
              ),
            },
            {
              title: "Orders",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {Math.floor((Math.random() * 100) % 12)}
                </p>
              ),
            },
          ]}
          items={items}
        />
      </ItemsListLayout>
    </LoadingContainer>
  );
}
