import "../../../assets/css/style.css"

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white text-black flex justify-center items-center">
      <div className="text-center loader" />
    </div>
  );
};

export default Loading;
