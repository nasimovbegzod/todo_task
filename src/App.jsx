import { Fragment, useEffect, useState } from "react";
import TaskCard from "./components/card/TaskCard";
import request from "./server";
import Period from "./utils/Period";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [callback, setCalback] = useState();
  const [id, setId] = useState(null);

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 60000);

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

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const refetch = () => {
    setCalback(!callback);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await request.get("get_task");
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [callback]);

  const postTask = async (e) => {
    e.preventDefault();
    let value = e.target.task_value.value;
    let words = value.split(" ");
    const resultKey = {};

    let hasDate = false;

    for (const item of words) {
      if (item === "bugun" || item === "ertaga") {
        resultKey[item] = item;
        hasDate = true;
      } else if (item.match(/^\d{4}-\d{2}-\d{2}$/)) {
        resultKey[item] = "Keyin";
        hasDate = true;
      }
    }

    if (!hasDate) {
      resultKey["bugun"] = "bugun";
    }

    const keyValueString = `"${Object.keys(resultKey)[0]}" ${
      Object.values(resultKey)[0]
    }"`;
    const a = keyValueString.split('"');
    const b = a.find(
      (el) => el === "bugun" || el === "ertaga" || el === " Keyin"
    );
    const pariod = b.trim();

    let pariod1 = words.find((el) => el !== "bugun" && el !== "ertaga");
    pariod1 = "bugun";
    let wordsNot = words.filter(
      (item) => !item.includes("bugun") && !item.includes("ertaga")
    );
    let task_description = wordsNot.join(" ");

    try {
      const { data } = await request.post("post_task", {
        task_description,
        pariod,
      });
      setId(data.task_id);
      refetch();
      e.target.task_value.value = "";
    } finally {
    }
  };

  return (
    <main>
      <section>
        <div className="container max-w-1200">
          <h1 className="text-center text-3xl font-bold mb-12">
            Vazifalar Menedjeri
          </h1>
          <form onSubmit={postTask}>
            <div className="flex justify-between items-center">
              <input
                placeholder="Yangi vazifa qo'shish"
                type="text"
                name="task_value"
                className="mr-6 w-full border-gray outline-none border-4 rounded-md p-2 pl-4 text-slate-600 text-xl font-medium"
              />
              <button
                type="submit"
                className="p-2 pl-3 bg-[#89D7AD] pr-3 text-center font-bold border-4 text-lg border-[#3FA86F] rounded-md"
              >
                +
              </button>
            </div>

            <div className="ml-1">
              <h1 className="text-lg font-semibold">{currentDateTime}</h1>
            </div>
          </form>
          {loading ? (
            <h1 className="text-2xl font-bold">Loading...</h1>
          ) : (
            Period.map((perid, i) => (
              <Fragment>
                <h2 key={i} className="text-2xl font-bold mb-1 capitalize">
                  {perid}
                </h2>
                {data
                  .filter((el) => el.pariod === perid)
                  .map((task) => (
                    <TaskCard key={task.id} {...task} id={id} />
                  ))}
              </Fragment>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
