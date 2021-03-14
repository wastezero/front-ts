import * as React from "react";
import { Link } from "react-router-dom";
interface IItemsListLayoutProps {
  title: string;
  createRoute?: string;
}

const ItemsListLayout: React.FunctionComponent<IItemsListLayoutProps> = (
  props,
) => {
  return (
    <div className="flex-1 flex flex-col bg-white h-0 w-full">
      <div className="flex px-6 py-4 items-start">
        <h3 className="text-xl font-semibold font-display text-gray-900">
          {props.title}
        </h3>
        {props.createRoute && (
          <Link
            to={props.createRoute}
            className="text-sm bg-transparent ml-auto cursor-pointer hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Create
          </Link>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default ItemsListLayout;
