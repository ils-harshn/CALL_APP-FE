import styles from "./Loaders.module.css";

export const FullScreenSpinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className={`${styles.spinner} w-10 h-10 border-4 rounded-full border-t-blue-300`}
      ></div>
    </div>
  );
};
