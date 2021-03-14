import * as React from "react";
import cn from "classnames";

interface IPaginationViewProps {
  pagination: any;
  onPaginate: (number) => void;
}

const PaginationView: React.FunctionComponent<IPaginationViewProps> = ({
  pagination,
  onPaginate,
}) => {
  React.useEffect(() => {
    console.log(pagination);
  }, []);
  return (
    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm leading-5 text-gray-700">
          Page:
          <span className="font-medium"> {pagination.current_page} </span>
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={(_) => onPaginate(--pagination.current_page)}
          disabled={pagination.current_page == 1}
          className={cn(
            "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
            pagination.current_page == 1
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-gray-500 ",
          )}
        >
          Previous
        </button>
        <button
          disabled={!pagination.next_page}
          onClick={(_) => onPaginate(++pagination.current_page)}
          className={cn(
            "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150",
            !pagination.next_page
              ? "cursor-not-allowed text-gray-500"
              : "text-gray-700 hover:text-gray-500 ",
          )}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default PaginationView;
