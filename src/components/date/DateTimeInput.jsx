import { useState, useEffect } from "react";

function DateTimeInput() {
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000); // 1 minutda bir yangilansin

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  return (
    <div className="ml-1">
      <input
        type="datetime-local"
        defaultValue={currentDateTime}
        className="border-none outline-none text-slate-700"
      />
    </div>
  );
}

export default DateTimeInput;
