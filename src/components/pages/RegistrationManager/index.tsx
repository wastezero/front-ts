import * as React from "react";
import { Api } from "@src/api/Kis";
import { useHistory, Link } from "react-router-dom";
import Button from "@src/components/atoms/Button";
import LogoImageUrl from "@src/assets/img/logo.png";
import { useStoreActions } from "@src/hooks";
import { setKisToken } from "@src/utils/utils";
import FoodsDropdown from "@src/components/organisms/FoodsDropdown";
import BranchesDropdown from "@src/components/organisms/BranchesDropdown";

interface IEnterNamePageProps {}

const RegistrationManagerPage: React.FunctionComponent<IEnterNamePageProps> = (
  props,
) => {
  const api = new Api();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const currentUserActions = useStoreActions((store) => store.user);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [branch, setBranch] = React.useState(false);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");

  const register = () => {
    setLoading(true);
    api
      .register({
        user: {
          email,
          password,
          password_confirmation: passwordConfirm,
          name,
          branch_id: (branch as any).id,
        },
      })
      .then((user) => {
        setKisToken(user.data.authentication_token);
        history.push("/account");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-start py-6 sm:px-6 lg:px-8">
      <h3 className="text-center text-2xl leading-6 font-extrabold text-gray-900">
        Register as a Manager
      </h3>
      <form
        onSubmit={(ev) => {
          register();
          ev.preventDefault();
        }}
        className="grid grid-cols-12 gap-6 pt-4 bg-white md:bg-transparent"
      >
        <div className="shadow sm:rounded-md  col-start-5 col-end-9">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div>
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Branch
              </label>
              <BranchesDropdown value={branch} onChange={setBranch} />
            </div>
            <div className="mt-6">
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="Enter email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Enter password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Password confirmation
              </label>
              <input
                required
                type="password"
                placeholder="Confirm password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={passwordConfirm}
                onChange={(ev) => {
                  setPasswordConfirm(ev.target.value);
                }}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                required
                placeholder="Enter name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={name}
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
                Surname
              </label>
              <input
                required
                placeholder="Enter surname"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                value={surname}
                onChange={(ev) => {
                  setSurname(ev.target.value);
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
    </div>
  );
};

export default RegistrationManagerPage;
