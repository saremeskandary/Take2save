import { Home, Map, ShoppingBag, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="btm-nav btm-nav-lg max-w-md mx-auto bg-base-100 border-t border-base-200">
      <button className="flex flex-col items-center justify-center">
        <Home className="h-5 w-5" />
        <span className="btm-nav-label">home</span>
      </button>
      <button className="flex flex-col items-center justify-center">
        <Map className="h-5 w-5" />
        <span className="btm-nav-label">explore</span>
      </button>
      <button className="flex flex-col items-center justify-center">
        <ShoppingBag className="h-5 w-5" />
        <span className="btm-nav-label">orders</span>
      </button>
      <button className="flex flex-col items-center justify-center">
        <User className="h-5 w-5" />
        <span className="btm-nav-label">profile</span>
      </button>
    </nav>
  );
}
