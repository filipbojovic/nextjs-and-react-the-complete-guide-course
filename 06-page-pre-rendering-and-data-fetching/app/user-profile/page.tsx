import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

type UserProfilePageProps = {
  username: string;
};

async function UserProfilePage() {
  console.log(cookies);
  // unstable_noStore();
  const { username }: UserProfilePageProps = await getProfileProps();

  return <h1>{username}</h1>;
}

// fetching data on each request to this page
async function getProfileProps() {
  return {
    username: "Fika",
  };
}

// // This tells Next.js to always render this page on the server
export const dynamic = "force-dynamic";
export default UserProfilePage;
