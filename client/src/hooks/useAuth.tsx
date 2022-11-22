import router from "../apis/users";

const UseGetHook = async (endPoint: string) => {
  try {
    const { data } = await router.get(endPoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return new Promise((res) => res(data));
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export default UseGetHook;
