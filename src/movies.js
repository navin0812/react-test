import { useQuery } from "@tanstack/react-query";
import { list } from "./api/article";

export default function Movies() {
  const { isLoading, isError, data, error } = useQuery(["Movies"], list);

  function Rendered({loading, error, data}) {
    if (!loading) {
      return (
        data.results.map((movie) => (
          <div className="movie" key={movie.episode_id}>
            <a href={`/detail/${movie.episode_id}`}>
              <h1>{movie.title}</h1>
            </a>
            <p>{movie.opening_crawl}</p>
          </div>
        )));
    
    } 
   
    return <div>Loading...</div>;
  }

  // if (isLoading) {
  //   Rendered = <span>Loading...</span>;
  // }

  // if (isError) {
  //   Rendered = <span>Error: {error.message}</span>;
  // }

  // if (data) {
  //    Rendered =
  // }

  return (
    <div>
      <h1>Movies Component</h1>
      <Rendered loading={isLoading} error={isError} data={data}></Rendered>
    </div>
  );
}
