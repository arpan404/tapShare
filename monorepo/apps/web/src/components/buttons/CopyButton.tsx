import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copyStatus, setCopyStatus] = useState<"Copy" | "Copied" | "Error">(
    "Copy",
  );
  const handleCopyText = async () => {
    let timeoutID: NodeJS.Timeout;
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("Copied");
    } catch (e) {
      setCopyStatus("Error");
    } finally {
      timeoutID = setTimeout(() => {
        clearTimeout(timeoutID);
        setCopyStatus("Copy");
      }, 3000);
    }
  };
  return (
    <button
      role="button"
      className="bg-blue-500 p-0 text-gray-50 rounded-full text-center font-semibold hover:bg-blue-600 ease-in transition-all duration-300 hover:scale-110 cursor-pointer w-[120px] py-2"
      title="Copy the text"
      onClick={handleCopyText}
    >
      {copyStatus}
    </button>
  );
}
