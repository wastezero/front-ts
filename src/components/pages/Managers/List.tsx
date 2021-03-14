import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import ItemsTable from "@src/components/organisms/ItemsTable";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import EyeSvg from "@heroicons/outline/eye.svg";
import CheckCircleSvg from "@heroicons/solid/check-circle.svg";
import ItemsListLayout from "@src/components/organisms/ItemsListLayout";
import Button from "@src/components/atoms/Button";
export interface IManagerListProps {}

const ApproveBtn: React.FC<{ item: any }> = ({ item }) => {
  const api = new Api();
  const [loading, setLoading] = React.useState(false);
  const [manager, setManager] = React.useState(item);

  return manager.status === "confirmed" ? (
    <dd className="flex items-center text-sm text-gray-700">
      <CheckCircleSvg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
      Verified account
    </dd>
  ) : (
    <Button
      loading={loading}
      type="button"
      className="inline-flex items-center px-2 py-1 border border-transparent text-xs leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-teal focus:border-teal-700 active:bg-teal-700 transition duration-150 ease-in-out"
      onClick={() => {
        setLoading(true);
        api
          .approveManager(manager.id)
          .then((response) => {
            setManager(response.data);
          })
          .finally(() => setLoading(false));
      }}
    >
      Confirm
    </Button>
  );

  return;
};

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
      <ItemsListLayout title="Managers" createRoute={`/register/restaurant`}>
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
              content: (item) => <ApproveBtn item={item} />,
            },
          ]}
          items={items}
        />
      </ItemsListLayout>
    </LoadingContainer>
  );
}
