import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "200px auto",

  borderColor: "white",
};

const Spinner = ({ loading }) => {
  return (
    <div className="">
      <ClipLoader
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
