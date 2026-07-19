"use client";

import React, { useState, useRef, useEffect } from "react";

interface DiaryInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function DiaryInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder = "Ask the diary...",
  disabled = false,
}: DiaryInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (value.trim()) {
        onSubmit();
      }
      return;
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div 
      className="diary-input-wrapper cursor-text select-none w-full h-full relative flex flex-col justify-start"
      onClick={handleContainerClick}
    >
      {/* Hidden input field for typing mechanics */}
      <input
        ref={inputRef}
        type="text"
        className="absolute inset-0 opacity-0 w-full h-full cursor-text z-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        maxLength={80}
        aria-label="Ask Ved's Diary"
      />

      {/* Visual Overlay of Hand-drawn Ink Letter Blooms */}
      <div className="w-full h-full font-handwritten text-2xl text-ink leading-[28px] flex flex-wrap content-start pt-1 relative">
        {value.length === 0 && (
          <span className="absolute left-0 top-1 text-[rgba(118,83,46,0.25)] italic text-xl select-none pointer-events-none">
            {placeholder}
          </span>
        )}

        {value.split("").map((char, index) => (
          <span
            key={`${index}-${char}`}
            className="ink-bloom-letter"
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
          >
            {char}
          </span>
        ))}
        
        {/* Blinking quill waiting indicator */}
        {isFocused && !disabled && (
          <span className="diary-cursor select-none" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
