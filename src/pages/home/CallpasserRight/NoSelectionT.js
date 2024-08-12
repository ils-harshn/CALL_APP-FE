import Logo from "../../../images/logo.png";

const NoSelectionT = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img alt="logo" src={Logo} className="text-center mb-6" />
        <p>Send a message to start chat</p>
        <p className="text-xs">or</p>
        <p>Make a call to start conversation.</p>
      </div>
    </div>
  );
};

export default NoSelectionT;
