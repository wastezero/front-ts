import { Api } from "@src/api/Kis";
import Button from "@src/components/atoms/Button";
import RestaurantsDropdown from "@src/components/organisms/RestaunrantsDropdown";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { firebaseapp } from "@src/utils/firebase";

interface IFoodCreateProps {}

const FoodCreate: React.FunctionComponent<IFoodCreateProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  let [restaurant, setRestaurant] = React.useState(false);
  let [name, setName] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [price, setPrice] = React.useState("");
  let [cuisine, setCuisine] = React.useState("");
  let [ingredients, setIngredients] = React.useState("");
  let [image, setImage] = React.useState("");

  const api = new Api();
  const history = useHistory();

  const onSubmit = () => {
    setLoading(true);
    api
      .createFood({
        food: {
          restaurant_id: (restaurant as any).id,
          name,
          description,
          price,
          cuisine,
          ingredients,
          image,
        },
      })
      .then(() => {
        history.push("/account/foods");
      })
      .catch(() => setLoading(false));
  };

  const onUploadFile = (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseapp.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      fileRef.getDownloadURL().then(setImage);
    });
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
              Restaurant
            </label>
            <RestaurantsDropdown value={restaurant} onChange={setRestaurant} />
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
              Description
            </label>
            <input
              required
              placeholder="Enter description"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={description}
              onChange={(ev) => {
                setDescription(ev.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <input
              required
              placeholder="Enter Cuisine"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={cuisine}
              onChange={(ev) => {
                setCuisine(ev.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <input
              required
              placeholder="Enter ingredients"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={ingredients}
              onChange={(ev) => {
                setIngredients(ev.target.value);
              }}
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={onUploadFile}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              required
              placeholder="Enter price"
              type="number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={price}
              onChange={(ev) => {
                setPrice(ev.target.value);
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

export default FoodCreate;
