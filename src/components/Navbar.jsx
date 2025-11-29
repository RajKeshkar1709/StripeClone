import { useEffect, useRef, useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import StripeDropdown from "./stripeDropdown";
import MobileMenu from "./MobileMenu";
import { navbarItems, solutionsMenu } from "./NavbarData";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  // close menus on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveMenu(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav ref={navRef} className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 py-4 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-8">
          <div className="text-white text-2xl font-bold">Logo</div>

          <div className="hidden lg:flex items-center gap-8 text-white text-sm font-medium">
            {navbarItems.map((item, idx) => {
              if (item.menu === "Solutions") {
                return (
                  <StripeDropdown
                    key={idx}
                    label={item.menu}
                    sections={item.sections}
                    isActive={activeMenu === item.menu}
                    onOpenChange={(value) => setActiveMenu(value)}
                  />
                );
              }

              return (
                <a key={idx} href={item.url} className="hover:text-gray-100 transition">
                  {item.menu}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-2 text-white hover:text-gray-100">
            Sign in <ChevronRight size={14} />
          </button>

          <button className="hidden lg:inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-full shadow">
            Contact sales
          </button>

          {/* Mobile menu button */}
          <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={navbarItems}
        solutionsSections={solutionsMenu}
      />
    </>
  );
}
