interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div role="alert" className="rounded border border-red-300 bg-red-50 px-4 py-3 text-red-800">
      <p className="font-semibold">Something went wrong</p>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;
