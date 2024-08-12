import useTabState from "../../../store/tabstate";

const message_status = {
  SEEN: 0,
  SENT: 1,
  SENDING: 2,
  FAILED: 3,
};

const message_status_map = {
  [message_status.SEEN]: {
    color: "text-green-500",
    text: "Seen",
  },
  [message_status.SENT]: {
    color: "text-yellow-500",
    text: "Sent",
  },
  [message_status.SENDING]: {
    color: "text-slate-500",
    text: "Sending",
  },
  [message_status.FAILED]: {
    color: "text-red-500",
    text: "Failed",
  },
};

const status = {
  OFFLINE: 0,
  ONLINE: 1,
  DND: 2,
};

const status_color = {
  [status.OFFLINE]: "bg-slate-500",
  [status.ONLINE]: "bg-green-500",
  [status.DND]: "bg-yellow-500",
};

const Member = ({ data, setActive, isActive = false }) => {
  return (
    <div
      onClick={setActive}
      className={`px-10 py-4 flex cursor-pointer border-l hover:bg-blue-50 ${
        isActive ? "bg-blue-50 border-l-blue-500" : "border-l-transparent"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex justify-center items-center text-xl relative">
        <div
          className={`absolute w-4 h-4 top-[-2px] right-[-2px] rounded-full border-2 border-white ${
            status_color[data.status]
          }`}
        ></div>
        {data.name[0].toUpperCase()}
      </div>

      <div className="ml-4 flex-grow min-w-0">
        <h4 className="font-semibold w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.name}
        </h4>
        <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
          {data.last_message.message}
        </p>
      </div>

      <div className="text-xs flex flex-col justify-end ml-4">
        <p>{data.last_message.date}</p>
        {data.last_message.count ? (
          <div
            title={data.last_message.count}
            className="w-4 h-4 mt-1 border bg-violet-400 rounded-full"
          ></div>
        ) : (
          <p
            className={`${
              message_status_map[data.last_message.status].color
            } font-bold`}
          >
            {message_status_map[data.last_message.status].text}
          </p>
        )}
      </div>
    </div>
  );
};

const DirectTab = () => {
  const data = [
    {
      id: 1,
      name: "Anushka Rawat",
      last_message: {
        message:
          "Hi, Anushka can we have a talk for a while, I need to tell you one last 3 words",
        status: message_status.SEEN,
        date: "09/08/24",
      },
      status: status.ONLINE,
    },
    {
      id: 2,
      name: "Harsh Narwariya",
      last_message: {
        message:
          "Hi, Anushka can we have a talk for a while, I need to tell you one last 3 words",
        status: message_status.SENT,
        date: "09/08/24",
      },
      status: status.OFFLINE,
    },
    {
      id: 3,
      name: "Jyoti Mishra",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        status: message_status.SENDING,
        date: "09/08/24",
      },
      status: status.DND,
    },
    {
      id: 4,
      name: "Krupal",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        status: message_status.SENT,
        date: "09/08/24",
      },
      status: status.DND,
    },
    {
      id: 5,
      name: "Dev",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        status: message_status.FAILED,
        date: "09/08/24",
      },
      status: status.DND,
    },
    {
      id: 6,
      name: "Dharmesh",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        count: 8,
        date: "09/08/24",
      },
      status: status.DND,
    },
    {
      id: 7,
      name: "Nandini Malviya",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        count: 8,
        date: "09/08/24",
      },
      status: status.ONLINE,
    },
    {
      id: 8,
      name: "Anmol",
      last_message: {
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        count: 8,
        date: "09/08/24",
      },
      status: status.OFFLINE,
    },
  ];

  const active = useTabState((state) => state.dTSelection);
  const setActive = useTabState((state) => state.changeDTSelection);

  return (
    <div className="mt-4 h-[calc(100vh-244px)] overflow-y-auto">
      {data.map((member) => (
        <Member
          key={member.id}
          data={member}
          isActive={active?.id === member.id}
          setActive={() => setActive(member)}
        />
      ))}
    </div>
  );
};

export default DirectTab;
