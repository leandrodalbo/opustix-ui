interface AboutFetchProps {
  isLoading: boolean;
  error: Error;
}

const AboutFetch = ({ isLoading, error }: AboutFetchProps) => {
  if (isLoading) return <div className="text-center py-8">🔄 Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-8">⚠️ {error.message}</div>
    );
};

export default AboutFetch;
