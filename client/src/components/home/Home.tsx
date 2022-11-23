import { useContext } from "react";
import Articles from "../articles/Article";
import "./home.css";
import { appContext } from "../../App";
const Home = ({ category }: { category: string }) => {
  const { isLoading } = useContext(appContext);
  return (
    <div>
      {isLoading && (
        <div className="loader-big">
          <span className="loader"></span>
        </div>
      )}
      <Articles category={category} />
    </div>
  );
};

export default Home;
