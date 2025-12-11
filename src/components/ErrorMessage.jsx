function ErrorMessage({ error }) {
  return (
    <div className="m-auto w-2/3">
      <p className="text-center text-red-400 text-lg p-2 mt-4 border border-red-200">
        There was an error. <strong>{error}</strong>
      </p>
    </div>
  );
}

export default ErrorMessage;
