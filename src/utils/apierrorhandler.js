const log = (error, callback) => {
  if (callback) callback();
  else alert(error?.message || "Something went wrong, please try again later!");
};

const apierrorhandler = (error, callbackData = undefined) => {
  if (error?.response?.status)
    log(error, callbackData?.[error.response.status]);
  else log(error, undefined);
};

export default apierrorhandler;
