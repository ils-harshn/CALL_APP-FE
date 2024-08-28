const ENDPOINTS = {
  register: "/user/auth/register",
  verifyemail: "/user/auth/verify-email",
  resendverifyemailOTP: "/user/auth/resend-verify-email-otp",
  login: "/user/auth/login",
  profile: "/user/auth/profile",
  search_friends: "/add-friends/search",
  send_connection_request: "/add-friends/send-connection-request",
  respond_on_connection_request: "/add-friends/respond-on-connection-request",
  get_accepted_connections: "/connections/get-accepted",
  get_messages_on_connection: "/messages/get",
  send_message_on_connection: "/messages/send",
};

export default ENDPOINTS;
