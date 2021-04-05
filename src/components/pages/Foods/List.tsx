import { Api } from "@src/api/Kis";
import LoadingContainer from "@src/components/atoms/LoadingContainer";
import ItemsTable from "@src/components/organisms/ItemsTable";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import EyeSvg from "@heroicons/outline/eye.svg";
import ItemsListLayout from "@src/components/organisms/ItemsListLayout";
export interface IFoodListProps {}

export function FoodList(props: IFoodListProps) {
  const api = new Api();
  const [loading, setLoading] = React.useState(true);
  let { pathname } = useLocation();
  const [items, setItems] = React.useState([]);
  const [pagination, setPagantion] = React.useState(null);

  React.useEffect(() => {
    api.foods().then((response) => {
      setLoading(false);
      setItems(response.data.foods);
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
      <ItemsListLayout title="Foods" createRoute={`${pathname}/create`}>
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
                  {`${item.name}`}
                </p>
              ),
            },
            {
              title: "Description",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.description}`}
                </p>
              ),
            },
            {
              title: "cuisine",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.cuisine}`}
                </p>
              ),
            },
            {
              title: "Restaurant id",
              content: (item) => (
                <p className="text-cool-gray-700 group-hover:text-cool-gray-900">
                  {`${item.restaurant ? item.restaurant.name : "–"}`}
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
