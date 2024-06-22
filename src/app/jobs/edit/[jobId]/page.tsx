import { JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import WorkOS from "@workos-inc/node";
import mongoose from "mongoose";
import React from "react";
import JobForm from "@/app/components/JobForm";

type PageProps = {
  params: {
    jobId: string;
  };
};

const EditJobPage = async (pageProps: PageProps) => {
  const { jobId } = pageProps.params;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobDoc) {
    return (
      <div>
        <h1>Not Found</h1>
      </div>
    );
  }
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return (
      <div>
        <h1>You need to login</h1>
      </div>
    );
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });
  if (oms.data.length === 0) {
    return (
      <div>
        <h1>Access denied</h1>
      </div>
    );
  }

  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    </div>
  );
};

export default EditJobPage;
