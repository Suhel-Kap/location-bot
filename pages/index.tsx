import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    status: "success",
    message: "",
    country: "",
    countryCode: "",
    region: "",
    regionName: "",
    city: "",
    zip: "",
    lat: "",
    lon: "",
    timezone: "",
    isp: "",
    org: "",
    as: "",
    mobile: "",
    proxy: "",
    hosting: "",
    query: "",
  });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    const res = await fetch(
      "http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query",
    );
    const data = await res.json();
    console.log(data);
    const send = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    setData(data);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>IP Address: {data?.query}</p>
      <p>Country: {data?.country}</p>
      <p>Region: {data?.regionName}</p>
      <p>City: {data?.city}</p>
      <p>Zip: {data?.zip}</p>
      <p>Latitude: {data?.lat}</p>
      <p>Longitude: {data?.lon}</p>
      <p>Timezone: {data?.timezone}</p>
      <p>ISP: {data?.isp}</p>
      <p>ORG: {data?.org}</p>
      <p>AS: {data?.as}</p>
      <p>Mobile: {data?.mobile}</p>
      <p>Proxy: {data?.proxy}</p>
      <p>Hosting: {data?.hosting}</p>
    </main>
  );
}
