import React from "react";
import JobRow from "./JobRow";
import { Job } from "@/models/Job";

const Jobs = ({ header, jobs }: { header: string; jobs: Job[] }) => {
  return (
    <div className="bg-slate-200 py-6 rounded-3xl">
      <div className="container mx-4">
        <h2 className="font-bold mb-4">{header || "Recent Jobs"}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {!jobs?.length && <div>No jobs found</div>}
            {jobs && jobs.map((job, idx) => <JobRow key={idx} jobDoc={job} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
