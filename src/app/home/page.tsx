import { Appbar } from "@/components/Appbar";
import { Cards } from "@/components/Cards";
import { NavBar } from "@/components/NavBar";
import Searchbar from "@/components/Searchbar";
import { SearchIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Appbar>
        <Searchbar></Searchbar>
      </Appbar>
      <div className="grid grid-cols-12">
        <NavBar></NavBar>
        <Cards></Cards>
      </div>
    </div>
  );
}
