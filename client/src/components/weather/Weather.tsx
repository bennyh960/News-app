import React, { useEffect, useState } from "react";
import router from "../../apis/users";
import UseGetHook from "../../hooks/useAuth";

import "./weather.css";
const Weather = () => {
  const [data, setData] = useState<any>([]);

  const call = async () => {
    try {
      const response = await UseGetHook("/auth/me");
      setData(() => response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    call();
    console.log(data);
  }, [data]);
  return <div>Weather</div>;
};

export default Weather;
