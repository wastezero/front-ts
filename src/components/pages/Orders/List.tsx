import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import ItemsTable from "@src/components/organisms/ItemsTable";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import EyeSvg from "@heroicons/outline/eye.svg";
import CheckCircleSvg from "@heroicons/solid/check-circle.svg";
import ItemsListLayout from "@src/components/organisms/ItemsListLayout";
export interface IOrderListProps {}

export function OrderList(props: IOrderListProps) {
  const api = new Api();
  const [loading, setLoading] = React.useState(true);
  let { pathname } = useLocation();
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    api.orders().then((response) => {
      setLoading(false);
      setItems(response.data.orders);
    });
  }, []);

  return (
    <LoadingContainer loading={loading}>
      <ItemsListLayout title="Orders" createRoute={`${pathname}/create`}>
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
              title: "Food Id",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.food.id}`}
                </p>
              ),
            },
            {
              title: "Food Name",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.food.name}`}
                </p>
              ),
            },
            {
              title: "Experation Date",
              content: (item) => (
                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 capitalize bg-yellow-100 text-yellow-500">
                  {`${item.expires_at}`}
                </p>
              ),
            },
            {
              title: "Deadline to take",
              content: (item) => (
                <p className="inline-flex items-center px-2.5 py-0.5 rounded-full leading-4 capitalize bg-red-100 text-red-500">
                  {`${item.deadline ? item.deadline : "–"}`}
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
