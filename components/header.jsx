// app/components/Header.tsx (or wherever your component is)
import { checkUser } from "@/lib/checkUser";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  await checkUser();

  return <HeaderClient />;
}
