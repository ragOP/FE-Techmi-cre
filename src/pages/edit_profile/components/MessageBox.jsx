const MessageBox = ({ type, message, retry = false }) => {
  const colors = {
    error: "red",
    warning: "yellow",
  };

  return (
    <div className={`max-w-xl mx-auto p-6 bg-${colors[type]}-50 border border-${colors[type]}-200 rounded-md`}>
      <p className={`text-${colors[type]}-800`}>{message}</p>
      {retry && (
        <button
          onClick={() => window.location.reload()}
          className={`mt-3 px-4 py-2 bg-${colors[type]}-600 text-white rounded-md hover:bg-${colors[type]}-700`}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default MessageBox;