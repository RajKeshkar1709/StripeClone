import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { iconMap } from "./iconMap";

export default function StripeDropdown({ label, sections, isActive, onOpenChange }) {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(700); // fallback

  // sync external active state
  useEffect(() => setOpen(Boolean(isActive)), [isActive]);

  
  useEffect(() => {
    function compute() {
      const el = containerRef.current?.closest("nav") || containerRef.current;
      if (!el) return;
      
      const available = Math.min(window.innerWidth - 80, el.offsetWidth + 40);
      setWidth(available);
    }
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  function openMenu() {
    onOpenChange(label); 
    setOpen(true);
  }
  function closeMenu() {
    onOpenChange(null);
    setOpen(false);
  }

  
  function onKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open ? closeMenu() : openMenu();
    } else if (e.key === "Escape") {
      closeMenu();
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        aria-expanded={open}
        onKeyDown={onKeyDown}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="flex items-center gap-1 text-white hover:text-gray-100 focus:outline-none"
      >
        <span className="select-none">{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Mega menu panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`${label} menu`}
          className="absolute left-0 top-full mt-4 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-8 z-40 overflow-hidden"
          style={{ width: width, minWidth: 480 }}
        >
          <div className="space-y-8">
            {sections.map((section, si) => (
              <div key={si} className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                  {section.title}
                </h3>

                <div className="grid grid-cols-2 gap-y-3">
                  {section.items.map((it, idx) => {
                    const Icon = iconMap[it.icon];
                    return (
                      <a
                        key={idx}
                        href={it.url}
                        target={it.external ? "_blank" : "_self"}
                        rel={it.external ? "noreferrer" : undefined}
                        className="flex items-center gap-3 py-2 rounded-md hover:text-blue-600 transition text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") window.location.href = it.url;
                        }}
                      >
                        {Icon && <Icon size={18} className="text-sky-500/90" />}
                        <span className="text-gray-700">{it.label}</span>
                        {it.external && <ExternalLink size={12} className="ml-auto text-gray-400" />}
                      </a>
                    );
                  })}
                </div>

                {/* horizontal separator except after last section */}
                {si !== sections.length - 1 && <div className="border-t border-gray-100 mt-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
