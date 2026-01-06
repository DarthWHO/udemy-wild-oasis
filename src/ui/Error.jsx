import { useRouteError } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";

function Error() {
  const error = useRouteError();
  const moveBack = useMoveBack();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>

      <button onClick={moveBack} size="large">
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
