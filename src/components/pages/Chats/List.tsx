import * as React from "react";

interface IChatListProps {}

const ChatList: React.FunctionComponent<IChatListProps> = (props) => {
  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 xl:flex">
      <section
        aria-labelledby="message-heading"
        className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last"
      >
        <div className="min-h-0 flex-1 overflow-y-auto">
          {/* <!-- Thread section--> */}
          <ul className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
            <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
              <div className="sm:flex sm:justify-between sm:items-baseline">
                <h3 className="text-base font-medium">
                  <span className="text-gray-900">Joe Armstrong</span>
                  {/* <!-- space --> */}
                  <span className="text-gray-600">wrote</span>
                </h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                  <time dateTime="2021-01-28T19:24">Yesterday at 7:24am</time>
                </p>
              </div>
              <div className="mt-4 space-y-6 text-sm text-gray-800">
                <p>Thanks so much! Can't wait to try it out.</p>
              </div>
            </li>

            <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
              <div className="sm:flex sm:justify-between sm:items-baseline">
                <h3 className="text-base font-medium">
                  <span className="text-gray-900">Monica White</span>
                  {/* <!-- space --> */}
                  <span className="text-gray-600">wrote</span>
                </h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                  <time dateTime="2021-01-27T16:35">Wednesday at 4:35pm</time>
                </p>
              </div>
              <div className="mt-4 space-y-6 text-sm text-gray-800">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Malesuada at ultricies tincidunt elit et, enim. Habitant nunc,
                  adipiscing non fermentum, sed est a, aliquet. Lorem in vel
                  libero vel augue aliquet dui commodo.
                </p>
                <p>
                  Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien
                  purus vitae vestibulum auctor faucibus ullamcorper. Leo quam
                  tincidunt porttitor neque, velit sed. Tortor mauris ornare ut
                  tellus sed aliquet amet venenatis condimentum. Convallis
                  accumsan et nunc eleifend.
                </p>
                <p>
                  <strong>Monica White</strong>
                  <br />
                  Customer Service
                </p>
              </div>
            </li>

            <li className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
              <div className="sm:flex sm:justify-between sm:items-baseline">
                <h3 className="text-base font-medium">
                  <span className="text-gray-900">Joe Armstrong</span>
                  {/* <!-- space --> */}
                  <span className="text-gray-600">wrote</span>
                </h3>
                <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                  <time dateTime="2021-01-27T16:09">Wednesday at 4:09pm</time>
                </p>
              </div>
              <div className="mt-4 space-y-6 text-sm text-gray-800">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Malesuada at ultricies tincidunt elit et, enim. Habitant nunc,
                  adipiscing non fermentum, sed est a, aliquet. Lorem in vel
                  libero vel augue aliquet dui commodo.
                </p>
                <p>
                  Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien
                  purus vitae vestibulum auctor faucibus ullamcorper. Leo quam
                  tincidunt porttitor neque, velit sed. Tortor mauris ornare ut
                  tellus sed aliquet amet venenatis condimentum. Convallis
                  accumsan et nunc eleifend.
                </p>
                <p>– Joe</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <aside className="block flex-shrink-0 order-first">
        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
          <div className="flex-shrink-0">
            <div className="h-16 bg-white px-6 flex flex-col justify-center">
              <div className="flex items-baseline space-x-3">
                <h2 className="text-ls font-medium text-gray-900">Inbox</h2>
                <p className="text-sm font-medium text-gray-500">1 messages</p>
              </div>
            </div>
            <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
              Sorted by date
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-">
            <ul className="border-b border-gray-200 divide-y divide-gray-200">
              {[1, 2, 3, 4, 5, 6].map(() => (
                <li className="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                  <div className="flex justify-between space-x-3">
                    <div className="min-w-0 flex-1">
                      <a href="#" className="block focus:outline-none">
                        <span className="absolute inset-0" />
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Saddam Assamatullayev
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          У меня проблема с статусом заказа, оно не отображается
                          в ввиде значка
                        </p>
                      </a>
                    </div>
                    <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                      1d ago
                    </time>
                  </div>
                  <div className="mt-1">
                    <p className="line-clamp-2 text-sm text-gray-600">
                      Список блюд не передается как положено и у меня проблема с
                      статусом заказа, оно не отображается в ввиде значка как я
                      сам хочу, но все работает
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </main>
  );
};

export default ChatList;
