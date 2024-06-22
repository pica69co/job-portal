"use client";
import { Job } from "@/models/Job";
import { faHeart, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import TimeAgo from "./TimeAgo";
import Link from "next/link";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// const jobs = [
//   {
//     image:
//       "https://apktodo.io/uploads/2022/2/spotify--am-nhac-so-1-the-gioi-icon.jpg",
//     title: "Senior Frontend Developer",
//     company: "Google",
//     location: "California, USA",
//     date: "1 day ago",
//     type: "Full-time",
//     ubication: "Remote",
//   },
//   {
//     image:
//       "https://apktodo.io/uploads/2022/2/spotify--am-nhac-so-1-the-gioi-icon.jpg",
//     title: "Senior Backend Developer",
//     company: "Facebook",
//     location: "Chicago, USA",
//     date: "2 days ago",
//     type: "Full-time",
//     ubication: "Remote",
//   },
//   {
//     image:
//       "https://apktodo.io/uploads/2022/2/spotify--am-nhac-so-1-the-gioi-icon.jpg",
//     title: "Senior Fullstack Developer",
//     company: "Amazon",
//     location: "LA - USA",
//     date: "3 days ago",
//     type: "Full-time",
//     ubication: "Hybrid",
//   },
//   {
//     image:
//       "https://apktodo.io/uploads/2022/2/spotify--am-nhac-so-1-the-gioi-icon.jpg",
//     title: "Senior DevOps Engineer",
//     company: "Microsoft",
//     location: "Remote",
//     date: "4 days ago",
//     type: "Full-time",
//     ubication: "Remote",
//   },
//   {
//     image:
//       "https://apktodo.io/uploads/2022/2/spotify--am-nhac-so-1-the-gioi-icon.jpg",
//     title: "Senior Data Scientist",
//     company: "Netflix",
//     location: "New York, USA",
//     date: "5 days ago",
//     type: "Full-time",
//     ubication: "Remote",
//   },
// ];

const JobRow = ({ jobDoc }: { jobDoc: Job }) => {
  const handleClick = () => {
    console.log("Delete job");
  };

  return (
    <>
      {jobDoc && (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
          <div className="absolute cursor-pointer top-2 right-4">
            <FontAwesomeIcon icon={faHeart} className="size-4 text-gray-400" />
          </div>
          <div className="flex grow gap-4">
            <div className="content-center">
              <Image src={jobDoc?.jobIcon} alt="logo" width={50} height={50} />
            </div>
            <div className="grow sm:flex">
              <div className="grow">
                <div>
                  <Link
                    href={`/jobs/${jobDoc.orgId}`}
                    className="block text-gray-500 text-sm hover:underline"
                  >
                    {jobDoc.orgName || "Unknown"}
                  </Link>
                </div>

                <div className="font-bold text-lg mb-1">
                  <Link
                    href={`/show/${jobDoc._id}`}
                    className="hover:underline"
                  >
                    {jobDoc.title}
                  </Link>
                </div>
                <div className="text-xs text-gray-500 ">
                  {jobDoc.remote}&nbsp; &middot; &nbsp;
                  {jobDoc.city},&nbsp;{jobDoc.country}&nbsp;&middot;&nbsp;
                  {jobDoc.type}-time&nbsp;
                  {!jobDoc.isAdmin && (
                    <>
                      &nbsp;&middot;&nbsp;&nbsp;
                      <Link href={`/jobs/edit/${jobDoc._id}`}>
                        <FontAwesomeIcon icon={faPencil} className="h-3" />
                      </Link>
                      &nbsp;&middot;&nbsp;
                      <button
                        type="button"
                        onClick={async () => {
                          await axios.delete(`/api/jobs?id=${jobDoc._id}`);
                          window.location.reload();
                        }}
                        className=""
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="h-3 text-red-500"
                        />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {jobDoc.createdAt && (
                <div className="content-end text-gray-500 text-xs">
                  <TimeAgo createdAt={jobDoc.createdAt} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobRow;
