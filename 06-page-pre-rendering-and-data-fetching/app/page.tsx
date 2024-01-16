import fs from "fs/promises";
import Link from "next/link";
import path from "path";

export type Product = {
  id: string;
  title: string;
  description: string;
};
// type HomePageProp = {
//   products: Product[];
// };

async function HomePage() {
  const products: Product[] = await getProducts();

  return (
    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

async function getProducts(): Promise<Product[]> {
  console.log("Re-Generating...");
  // since this file is being executed by the nextJs, currentWorkingDirectory will work the root folder
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const products: Product[] = JSON.parse(jsonData.toString())["products"];

  return products;
}

// export async function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }];
// }

// export const revalidate = 10;
export default HomePage;
