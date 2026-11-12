function Spinner() {
  return (
    <div role="status" className="flex justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-stone-800 motion-reduce:animate-none" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
