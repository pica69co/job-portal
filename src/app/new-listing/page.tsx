import { faArrowRight, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "@workos-inc/authkit-nextjs";
import WorkOS, {
  AutoPaginatable,
  OrganizationMembership,
} from "@workos-inc/node";
import Link from "next/link";
import React from "react";

const NewListing = async () => {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.NEXT_PUBLIC_WORKOS_API_KEY);

  if (!user) {
    return (
      <div className="container">You need to be logged in to post a job</div>
    );
  }

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );

  const organizationsNames: { [key: string]: string } = {};
  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );
    organizationsNames[organization.id] = organization.name;
  }

  return (
    <div className="container">
      <div className="">
        {/* <div>
          <pre>{JSON.stringify(organizationMemberships, null, 2)}</pre>
        </div> */}

        <h2 className="text-lg mt-6">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">
          Select a company to create a job add for
        </p>
        <div>
          <div>
            {Object.keys(organizationsNames).map((orgId) => (
              <Link
                href={`/new-listing/${orgId}`}
                key={orgId}
                className={
                  "py-2 px-4 flex gap-2 items-center" +
                  (Object.keys(organizationsNames)[0] === orgId
                    ? ""
                    : "border-t")
                }
              >
                {organizationsNames[orgId]}
                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
              </Link>
            ))}
          </div>
        </div>
        {organizationMemberships.data.length === 0 && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md ">
            No companies found assigned to your user
          </div>
        )}

        <Link
          href={"/new-company"}
          className="inline-flex gap-2 items-center rounded-md bg-gray-200 px-4 py-2 mt-6"
        >
          Create a new company
          <FontAwesomeIcon icon={faArrowRight} className="h-4" />
        </Link>
      </div>
    </div>
  );
};

export default NewListing;
