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
    name: "Jony Justin",
    last_call: {
      status: CALL_STATUS.INCOMING,
      date_time: "3:30pm",
    },
  },
  {
    id: 6,
    name: "Martin Magni",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },
  {
    id: 7,
    name: "Josph Josh",
    last_call: {
      status: CALL_STATUS.MISSED,
      date_time: "3:30pm",
    },
  },
  {
    id: 8,
    name: "Ali",
    last_call: {
      status: CALL_STATUS.OUTGOING,
      date_time: "3:30pm",
    },
  },
];

export default data;
