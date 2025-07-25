import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

// eslint-disable-next-line react/prop-types
function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <>
      {/* 🌸 加一条顶部粉色渐变横线 */}
      <div className="w-full h-1 bg-gradient-to-r from-pink-300 via-pink-400 to-purple-300"></div>
      <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
          <Button
            onClick={handleLogout}
            className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
