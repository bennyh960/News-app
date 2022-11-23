import { useContext, useState } from "react";
import { appContext } from "../../App";
import "./select.css";

const Select = () => {
  const { setCountry } = useContext(appContext);
  const [country, setSelectedCountry] = useState("us");
  const handleSelect = (e: any) => {
    // @ts-ignore
    setCountry(() => e.target.value);
    setSelectedCountry(() => e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div className="custom-select btn" style={{ width: "200px" }}>
      <select onChange={handleSelect} value={country}>
        <option value="us">USA</option>
        <option value="fr">France</option>
        <option value="il">Israel</option>
        <option value="gr">Germanny</option>
        <option value="ru">Russia</option>
        <option value="at">Australlia</option>
        <option value="br">Britania</option>
      </select>
    </div>
  );
};

export default Select;
