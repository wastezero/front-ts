import * as React from "react";
import { createConsumer } from "actioncable";
import { getCookie } from "@src/utils/utils";
import { Api } from "@src/api/Kis";
import LoadingSpinner from "@src/components/atoms/LoadingSpinner";
import SendIcon from "@heroicons/solid/arrow-circle-right.svg";

interface IChatListProps {}

const ChatMessages: React.FC<{ chat: any; cable: any }> = ({ chat, cable }) => {
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [messageIsSending, setMessageIsSending] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState("");
  const messaagesRef = React.useRef<any>();

  messaagesRef.current = messages;

  const token = getCookie("kis_token");
  const api = new Api();

  React.useEffect(() => {
    setLoading(true);
    api
      .messages(chat.id)
      .then(({ data }) => setMessages(data))
      .finally(() => setLoading(false));

    cable.subscriptions.create("MessageChannel", {
      received: (payload) => {
        console.log("socket received:", payload);
        const action = payload.message.action;
        switch (action) {
          case "new_message":
            const messageParsed = JSON.parse(
              JSON.parse(payload.message.message),
            );

            setMessages([...messaagesRef.current, messageParsed]);
            break;
          case "new_chat":
            // api.chats().then(({ data }) => setChats(data));
            break;
          default:
            console.log(`OrderChanel message: unhandled action ${action}`);
        }
      },
    });
  }, []);

  const onMessageSend = React.useCallback(async () => {
    setMessageIsSending(true);
    api
      .sendMessage({
        chat_id: chat.id,
        text: newMessage,
      })
      .then(({ data }) => {
        setNewMessage("");
        setMessages((prevMessages) => [...prevMessages, data]);
      })
      .finally(() => setMessageIsSending(false));
  }, [newMessage]);

  return (
    <section
      aria-labelledby="message-heading"
      className="min-w-0 flex-1 h-full flex flex-col overflow-hidden"
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : (
            messages.map((message) => {
              return (
                <li
                  className="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6"
                  key={`message-${message.id}`}
                >
                  <div className="sm:flex sm:justify-between sm:items-baseline">
                    <h3 className="text-base font-medium">
                      <span className="text-gray-900">
                        {message.sender.name}
                      </span>
                      <span className="text-gray-600"> wrote</span>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                      <time dateTime="2021-01-28T19:24">
                        Yesterday at 7:24am
                      </time>
                    </p> */}
                  </div>
                  <div className="mt-4 space-y-6 text-sm text-gray-800">
                    <p>{message.text}</p>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="w-full px-2 py-4  bg-white flex space-x-2">
        <input
          type="text"
          className="shadow-sm focus:outline-none text-lg p-2 block w-full border-gray-300 rounded-md"
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        {messageIsSending ? (
          <LoadingSpinner />
        ) : (
          <button
            className="p-2"
            onClick={onMessageSend}
            disabled={newMessage.length === 0 || loading}
          >
            <SendIcon className="w-7 h-7 text-blue-600" />
          </button>
        )}
      </div>
    </section>
  );
};

const ChatList: React.FunctionComponent<IChatListProps> = (props) => {
  const [chatsLoading, setChatsLoading] = React.useState(false);
  const [chats, setChats] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState(null);

  const token = getCookie("kis_token");
  const cable = createConsumer(
    `wss://wastezero-backend.herokuapp.com/cable?token=${token}`,
  );

  cable.connect();

  React.useEffect(() => {
    const api = new Api();
    setChatsLoading(true);
    api
      .chats()
      .then(({ data }) => setChats(data))
      .finally(() => setChatsLoading(false));

    cable.subscriptions.create("MessageChannel", {
      received: (payload) => {
        console.log("socket received:", payload);
        const action = payload.message.action;
        switch (action) {
          case "new_message":
            // api.chats().then(({ data }) => setChats(data));
            break;
          case "new_chat":
            // api.chats().then(({ data }) => setChats(data));
            break;
          default:
            console.log(`OrderChanel message: unhandled action ${action}`);
        }
      },
    });
  }, []);

  return (
    <main className="min-w-0 flex-1 border-t border-gray-200 overflow-scroll flex">
      <aside className="block flex-shrink-0">
        <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
          <div className="flex-shrink-0">
            <div className="h-16 bg-white px-6 flex flex-col justify-center">
              <div className="flex items-baseline space-x-3">
                <h2 className="text-ls font-medium text-gray-900">Inbox</h2>
                <p className="text-sm font-medium text-gray-500">
                  {chats.length} messages
                </p>
              </div>
            </div>
            <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">
              Sorted by date
            </div>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-">
            {chatsLoading ? (
              <LoadingSpinner />
            ) : (
              <ul className="border-b border-gray-200 divide-y divide-gray-200">
                {chats.map((chat, index) => (
                  <li
                    key={`chatpreview-${index}`}
                    className="relative bg-white py-5 px-6 cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600"
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <div className="flex justify-between space-x-3">
                      <div className="min-w-0 flex-1">
                        <div className="block focus:outline-none">
                          <span className="absolute inset-0" />
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {chat.user.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {chat.user.email}
                          </p>
                        </div>
                      </div>
                      <time className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                        {chat.user.id}
                      </time>
                    </div>
                    <div className="mt-1">
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {chat.last_message ? chat.last_message.text : "–"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </div>
      </aside>
      {currentChat && <ChatMessages chat={currentChat} cable={cable} />}
    </main>
  );
};

export default ChatList;
