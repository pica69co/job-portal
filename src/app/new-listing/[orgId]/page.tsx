import JobForm from "@/app/components/JobForm";
import { getUser } from "@workos-inc/authkit-nextjs";
import WorkOS from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};
export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.NEXT_PUBLIC_WORKOS_API_KEY);
  if (!user) {
    return <div className="container">Please log in</div>;
  }
  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return (
      <div className="container">
        You do not have access to this organization
      </div>
    );
  }
  return <JobForm orgId={orgId} />;
}
