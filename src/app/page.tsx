import { Appbar } from "@/components/Appbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div className="text-white">loading...</div>;
  }
  return (
    <div className="bg-[#111]">
      <Appbar></Appbar>
    </div>
  );
}
