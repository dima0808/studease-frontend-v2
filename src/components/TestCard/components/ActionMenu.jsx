import { useState, useEffect, useRef } from "react";
import ActionIcon from "@/components/icons/ActionIcon";
import Button from "@/components/Button";

const ActionMenu = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: "100%", right: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (open && buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      let top = buttonRect.bottom + 5;
      let left = buttonRect.left;

      if (top + menuRect.height > window.innerHeight) {
        top = buttonRect.top - menuRect.height - 5;
      }

      if (left + menuRect.width > window.innerWidth) {
        left = window.innerWidth - menuRect.width - 10;
      }

      if (left < 0) left = 10;

      setPosition({ top, left });
    }
  }, [open]);

  return (
    <div className="test-card__actions">
      <button
        ref={buttonRef}
        title="Open actions"
        className="test-card__button"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ActionIcon />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="test-card__dropdown"
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <Button text="Info" iconName="InfoIcon" />
          <Button text="Clone" iconName="CloneIcon" />
          <Button text="Export" iconName="ExportIcon" />
          <Button text="Delete" iconName="RemoveIcon" />
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
