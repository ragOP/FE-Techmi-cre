import Toast from ".";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts &&
        toasts.length > 0 &&
        toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            title={toast.title}
            variant={toast.variant}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
    </div>
  );
};

export default ToastContainer;

// addToast({
//   title: "Success",
//   message: "Your action was completed successfully!",
//   variant: "default",
//   duration: 3000,
// });

// addToast({
//   title: "Error",
//   message: "Something went wrong. Please try again.",
//   variant: "destructive",
//   duration: 5000,
// });

// addToast({
//   title: "Info",
//   message: "This is an informational message.",
//   variant: "default",
//   duration: 4000,
// });
