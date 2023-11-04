import { useEffect, useState } from "react";

const TaskCard = ({ task_description, task_id, id, created_at }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  let hourSplit = created_at.split("T")[1];
  const hour = hourSplit.split(".")[0];
  let timeParts = hour.split(":");
  let formattedTime = timeParts[0] + ":" + timeParts[1]; // Bu vaqt misoli
  let timeParts2 = formattedTime.split(":");
  let hours = parseInt(timeParts2[0], 10);
  let minutes = parseInt(timeParts2[1], 10);
  if (minutes === 1) {
    hours++;
  }
  if (minutes <= 30) {
    hours++;
  }
  if (hours === 24) {
    hours = 0;
  }
  let formattedTime2 = hours.toString().padStart(2, "0") + ":00";

  let testdate = /\d{4}-\d{2}-\d{2}/;
  let task_descriptionResult = task_description.replace(testdate, "").trim();
  let ssss = task_description.match(testdate);
  let date = ssss ? ssss[0] : "";

  return (
    <div className="flex justify-between items-center pl-8">
      <div className="flex ">
        <input onChange={handleCheck} type="checkbox" className="w-5" />
        <h4
          className={`ml-2 text-lg font-semibold capitalize ${
            checked ? "line-through text-slate-500" : ""
          }`}
        >
          {task_descriptionResult}
        </h4>
      </div>
      <div>
        <p
          className={`text-lg font-semibold ${
            checked ? "line-through text-slate-500" : ""
          }`}
        >
          {task_id === id ? date : date}{" "}
          {task_id === id ? formattedTime2 : formattedTime2}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
