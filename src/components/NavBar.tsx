import { FileText, Link2, TagsIcon, TwitterIcon, Youtube } from "lucide-react";

export function NavBar() {
  return (
    <div className="h-screen  text-white p-4 col-span-2 bg-[#181818]">
      <ul className="space-y-6">
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer">
          <Youtube className="w-5 h-5" />
          <span>Youtube Videos</span>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer">
          <TwitterIcon className="w-5 h-5" />
          <span>Twitter Posts</span>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer">
          <FileText className="w-5 h-5" />
          <span>Documents</span>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer">
          <Link2 className="w-5 h-5" />
          <span>Links</span>
        </li>
        <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282828] cursor-pointer">
          <TagsIcon className="w-5 h-5" />
          <span>Tags</span>
        </li>
      </ul>
    </div>
  );
}
