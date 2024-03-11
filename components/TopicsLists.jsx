import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

// By default the fetch method in the next app will cache the data
// Once you get the topics and if changes are made in the database and if the topics are fetched once again then updated data will not be fetched because
// it'll stored the first data as cache. So we need to store the cache as no-store so that everytime we hit the endpoint
// we need to get the updated data
const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsLists() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id}/>
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
