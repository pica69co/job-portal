import Image from "next/image";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { use } from "react";
import { getUser } from "@workos-inc/authkit-nextjs";
import { JobModel, addOrgAndUserData } from "@/models/Job";

export default async function Home() {
  const { user } = await getUser();
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    user
  );

  return (
    <>
      <Hero />
      <Jobs header={""} jobs={latestJobs} />
    </>
  );
}
