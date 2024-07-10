import { useEffect, useState } from "react";
import axios from "axios";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=100"
      );
      console.log(response?.data);
      setData((data) => [...data, ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleScrollEvent = () => {
    if (window.scrollY + window.innerHeight <= document.body.scrollHeight) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScrollEvent);

    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);
  return (
    <div>
      {data &&
        Object.keys(data).map((d) => {
          return JSON.stringify(data[d]);
        })}
    </div>
  );
};
export default InfiniteScroll;
