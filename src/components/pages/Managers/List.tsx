import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import ItemsTable from "@src/components/organisms/ItemsTable";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import EyeSvg from "@heroicons/outline/eye.svg";
import CheckCircleSvg from "@heroicons/solid/check-circle.svg";
import ItemsListLayout from "@src/components/organisms/ItemsListLayout";
export interface IManagerListProps {}

export function ManagerList(props: IManagerListProps) {
  const api = new Api();
  const [loading, setLoading] = React.useState(true);
  let { pathname } = useLocation();
  const [items, setItems] = React.useState([]);
  const [pagination, setPagantion] = React.useState(null);

  React.useEffect(() => {
    api.managers().then((response) => {
      setLoading(false);
      setItems(response.data.managers);
      setPagantion(response.data.meta);
    });
  }, []);

  const onPaginate = (page) => {
    setLoading(true);
    api.foods(page).then((response) => {
      setLoading(false);
      setItems(response.data.foods);
      setPagantion(response.data.meta);
    });
  };

  return (
    <LoadingContainer loading={loading}>
      <ItemsListLayout title="Managers" createRoute={`${pathname}/create`}>
        <ItemsTable
          pagination={pagination}
          onPaginate={onPaginate}
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
              title: "Name",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.name} ${item.surname ? item.surname : ""}`}
                </p>
              ),
            },
            {
              title: "Branch",
              content: (item) => (
                <Link
                  to={`/account/branches/${item.branch.id}`}
                  className="inline-flex space-x-2 items-center justify-between group"
                >
                  <p className="text-sm leading-5 text-gray-700 group-hover:text-cool-gray-900">
                    {item.branch.restaurant.name}
                  </p>
                </Link>
              ),
            },
            {
              title: "Status",
              content: (item) =>
                item.status === "confirmed" ? (
                  <dd className="flex items-center text-sm text-gray-700">
                    <CheckCircleSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                    Verified account
                  </dd>
                ) : (
                  <button
                    type="button"
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-5 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
                    onClick={(_) => {}}
                  >
                    Confirm
                  </button>
                ),
            },
          ]}
          items={items}
        />
      </ItemsListLayout>
    </LoadingContainer>
  );
}
