import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export default function MobileMenu({
  open,
  onClose,
  items,
  solutionsSections,
}) {
  // lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 w-full max-w-md h-full bg-white p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={onClose} aria-label="Close menu" className="p-2">
            <X />
          </button>
        </div>

        <ul className="space-y-3">
          {items.map((it, i) => (
            <li key={i}>
              {/* Solutions will show a nested view - we'll keep simple: if Solutions, navigate to nested screen */}
              <a
                href={it.url || "#"}
                onClick={(e) => {
                  if (it.menu === "Solutions") {
                    e.preventDefault();
                    // trigger a navigation by replacing content: we render an anchor that toggles the nested view via hash
                    window.location.hash = "solutions-mobile";
                  } else {
                    onClose();
                  }
                }}
                className="flex items-center justify-between py-3 text-gray-800 font-medium"
              >
                <span>{it.menu}</span>
                <ChevronRight />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t pt-6 space-y-3">
          <button className="w-full py-2 border rounded-md">Start now</button>
          <button className="w-full py-2 rounded-full bg-orange-500 text-white">Contact sales</button>
        </div>

        {/* Solutions nested view: we use a simple hash-based approach for demo */}
        <MobileSolutions
          sections={solutionsSections}
          onBack={() => {
            window.location.hash = "";
          }}
        />
      </aside>
    </div>
  );
}

function MobileSolutions({ sections, onBack }) {
  useEffect(() => {
    function onHash() {
      const el = document.getElementById("solutions-mobile-screen");
      if (!el) return;
      if (window.location.hash === "#solutions-mobile") el.classList.remove("hidden");
      else el.classList.add("hidden");
    }
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div id="solutions-mobile-screen" className="hidden fixed inset-0 z-60 bg-white p-6 overflow-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} aria-label="Back"><ChevronLeft /></button>
        <h3 className="text-lg font-bold">Solutions</h3>
      </div>

      <div className="space-y-6">
        {sections.map((sec, i) => (
          <div key={i}>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {sec.title}
            </h4>
            <ul className="space-y-2">
              {sec.items.map((it, idx) => (
                <li key={idx}>
                  <a href={it.url} className="block py-2 text-gray-700" onClick={() => (window.location.hash = "")}>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 space-y-3">
        <button className="w-full py-2 border rounded-md">Start now</button>
        <button className="w-full py-2 rounded-full bg-orange-500 text-white">Contact sales</button>
      </div>
    </div>
  );
}
