import Jobs from "@/app/components/Jobs";
import { JobModel, addOrgAndUserData } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import WorkOS from "@workos-inc/node";
import mongoose from "mongoose";
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  };
};
const CompanyJobsPage = async (props: PageProps) => {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  // await mongoose.connect(process.env.MONGO_URI as string);
  const { user } = await getUser();
  // json.parse(json.stringify()) is a hack to show orgName in the UI
  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );

  // for (const job of jobsDocs) {
  //   const org = await workos.organizations.getOrganization(job.orgId);
  //   job.orgName = org.name;
  // }

  jobsDocs = await addOrgAndUserData(jobsDocs, user);

  return (
    <div>
      {/**json.stringify show json format of info from db */}
      {/* <pre>{JSON.stringify(jobsDocs, null, 2)}</pre> */}

      <div className="container">
        <h1 className="text-2xl font-bold">{org?.name} Jobs</h1>
      </div>
      <Jobs jobs={jobsDocs} header={`Jobs posted by ${org.name}`} />
      {/* Company Jobs Page: {props.params.orgId} */}
    </div>
  );
};

export default CompanyJobsPage;
