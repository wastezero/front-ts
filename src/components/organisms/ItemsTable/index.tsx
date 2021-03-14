import * as React from "react";
import cn from "classnames";
interface IItemsTableProps {
  columns: {
    title: string;
    content: any;
  }[];
  items: any[];
}

const ItemsTable: React.FunctionComponent<IItemsTableProps> = ({
  items,
  columns,
}) => {
  return (
    <div className="flex-1 h-0 flex flex-col">
      <div className="max-w-100 overflow-scroll relative flex-1">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`row-td:${index}`} className="sticky top-0 p-0 z-10">
                  <div
                    className={
                      "px-4 py-3  border-t border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-cool-gray-500 uppercase whitespace-no-wrap text-left"
                    }
                  >
                    {column.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cool-gray-200 text-sm leading-5 text-cool-gray-900">
            {items.map((item, index) => (
              <tr key={`row-${index}`}>
                {columns.map((column, index) => (
                  <td
                    key={`row-td:${index}`}
                    className="px-4 py-4 whitespace-no-wrap bg-white"
                  >
                    {column.content(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsTable;
