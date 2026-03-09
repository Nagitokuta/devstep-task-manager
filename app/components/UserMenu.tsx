"use client"

import { useState, useRef, useEffect } from "react";
import LogoutButton from "./LogoutButton";

export default function UserMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 外クリックでメニューを閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 cursor-pointer rounded-full bg-gray-300 flex items-center justify-center"
      >
        👤
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">{email}</p>

          <LogoutButton
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-red-400 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}