// import { auth } from '@clerk/nextjs/server'

const OrganizationIdPage = ({
  params,
}: {
  params: { organizationId: string };
}) => {
  // const {userId, orgId} = auth()
  return (
    <div>
      <form action="">
        <input
          type="text"
          id="titlte"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1 rounded-sm"
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;
