export const CALL_STATUS = {
  INCOMING: 1,
  OUTGOING: 2,
  MISSED: 3,
};

const data = [
  {
    id: 1,
    name: "Jony Justin",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "3:30pm",
    },
  },
  {
    id: 2,
    name: "Martin Magni",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },
  {
    id: 3,
    name: "Josph Josh",
    last_call: {
      status: CALL_STATUS.MISSED,
      date_time: "3:30pm",
    },
  },
  {
    id: 4,
    name: "Ali",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },
  {
    id: 5,
    name: "Monu",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "3:30pm",
    },
  },
  {
    id: 6,
    name: "Astrio",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },
  {
    id: 7,
    name: "Jacob",
    last_call: {
      status: CALL_STATUS.MISSED,
      date_time: "3:30pm",
    },
  },
  {
    id: 8,
    name: "Nile Gosh",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },

  {
    id: 9,
    name: "Dev",
    last_call: {
      status: CALL_STATUS.MISSED,
      date_time: "3:30pm",
    },
  },
  {
    id: 10,
    name: "Pandit",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "3:30pm",
    },
  },
  {
    id: 11,
    name: "Moron",
    last_call: {
      status: CALL_STATUS.MISSED,
      date_time: "3:30pm",
    },
  },
  {
    id: 12,
    name: "XE Musk",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "Thusday 3:30pm",
    },
  },
  {
    id: 13,
    name: "Putin",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "21-12-2023 3:30pm",
    },
  },
];

export default data;
