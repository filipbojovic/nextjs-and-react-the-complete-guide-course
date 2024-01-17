import fs from "fs/promises";
import path from "path";
import { Product } from "../page";
import { notFound } from "next/navigation";

type ProductDetailPageProps = {
  params: { pid: string };
  searchParams: {};
};

async function ProductDetailPage(props: ProductDetailPageProps) {
  const { params } = props;
  const product: Product = await getProductDetail(props);

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const products: Product[] = JSON.parse(jsonData.toString())["products"];

  return products;
}

// pre-generate a page with dynamic-params is combined with generateStaticParams below
async function getProductDetail({ params }: ProductDetailPageProps) {
  const productId = params.pid;
  const products: Product[] = await getData();
  const product: Product = products.find((p) => p.id === productId)!;

  if (!product) {
    return notFound();
  }

  return product;
}

// ProductDetailPage should be pre-generated three times iwth these three values
// and then nextJs will call getProductDetail 3 times for these IDs
export async function generateStaticParams() {
  const products: Product[] = await getData();
  const ids = products.map((p) => p.id);
  const params = ids.map((id) => ({ pid: id }));

  return params;
  // return [{ pid: "p1" }, { pid: "p2" }, { pid: "p3" }];
}

// controls how params outside of generateStaticParams are handled
// FALLBACK property
export const dynamicParams = true;

export default ProductDetailPage;
