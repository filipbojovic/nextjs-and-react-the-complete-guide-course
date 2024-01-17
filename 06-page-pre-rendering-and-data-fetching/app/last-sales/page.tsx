"use client";
import { useEffect, useState } from "react";

type SaleModel = {
  id: string;
  username: string;
  volume: number;
};

const URL: string =
  "https://nextjs-8bb7d-default-rtdb.europe-west1.firebasedatabase.app/sales.json";

export default function LastSalesPage() {
  const initialState: SaleModel[] = await getLastSalesPreGenerated();
  const [sales, setSales] = useState<SaleModel[]>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const transformedSales: SaleModel[] = [];

        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet!</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

// pre-generate page
async function getLastSalesPreGenerated() {
  const response = await fetch(URL);
  const data = await response.json();
  const transformedSales: SaleModel[] = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return transformedSales;
}
