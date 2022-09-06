import { useQuery } from "@tanstack/react-query";
import { get } from "./api/article";

export default function Detail(props) {
  const params = props.params;
  const id = params.pathname.split("/")[2];

  const { isLoading, isError, data } = useQuery(["Detail", { id }], get);

  function Rendered({ loading, error, data }) {
    if (!loading) {
      return (
        <div>
          {/* <p>{data.title}</p> */}
          <p>Director: {data.director}</p>
          <p>Producer: {data.producer}</p>
          <p>ReleaseDate: {data.release_date}</p>
        </div>
      );
    }
    if (loading) {
      return <span>Loading...</span>;
    }

    if (error) {
      return <span>Error: {error.message}</span>;
    }
    return <></>;
  }

  return (
    <div>
      <h1>Detail</h1>
      <Rendered loading={isLoading} error={isError} data={data}></Rendered>
    </div>
  );
}
