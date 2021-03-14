import { Api } from "@src/api/Kis";
import Button from "@src/components/atoms/Button";
import RestaurantsDropdown from "@src/components/organisms/RestaunrantsDropdown";
import { useHistory } from "react-router-dom";
import * as React from "react";
import FoodsDropdown from "@src/components/organisms/FoodsDropdown";
import BranchesDropdown from "@src/components/organisms/BranchesDropdown";

interface IOrderCreateProps {}

const OrderCreate: React.FunctionComponent<IOrderCreateProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  let [branch, setBranch] = React.useState(false);
  let [food, setFood] = React.useState(false);
  let [price, setPrice] = React.useState("");
  let [deadline, setDeadline] = React.useState("");
  let [dueDate, setDueDate] = React.useState("");

  const api = new Api();
  const history = useHistory();

  const onSubmit = () => {
    setLoading(true);
    api
      .createOrder({
        order: {
          food_id: (food as any).id,
          branch_id: (branch as any).id,
          expires_at: deadline,
          deadline: dueDate,
          discount_price: price,
        },
      })
      .then(() => {
        history.push("/account/orders");
      })
      .catch(() => setLoading(false));
  };

  return (
    <form
      onSubmit={(ev) => {
        onSubmit();
        ev.preventDefault();
      }}
      className="grid grid-cols-12 gap-6 pt-4 bg-white md:bg-transparent"
    >
      <div className="shadow sm:rounded-md sm:overflow-hidden col-start-4 col-end-10">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Food
            </label>
            <FoodsDropdown value={food} onChange={setFood} />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Branch
            </label>
            <BranchesDropdown value={branch} onChange={setBranch} />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              required
              placeholder="Enter price of order"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={price}
              onChange={(ev) => {
                setPrice(ev.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Food expiration dueDate
            </label>
            <input
              required
              type="date"
              placeholder="Enter description"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={dueDate}
              onChange={(ev) => {
                setDueDate(ev.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Deadline of the order
            </label>
            <input
              required
              type="date"
              placeholder="Enter order dealine"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={deadline}
              onChange={(ev) => {
                setDeadline(ev.target.value);
              }}
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <span className="inline-flex rounded-md shadow-sm">
            <Button
              disabled={loading}
              loading={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Submit
            </Button>
          </span>
        </div>
      </div>
    </form>
  );
};

export default OrderCreate;
