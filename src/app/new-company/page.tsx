import { getUser } from "@workos-inc/authkit-nextjs";
import React from "react";
import { createCompany } from "../actions/page";

const NewCompanyPage = async () => {
  const { user } = await getUser();
  async function handleNewCompanyForm(data: FormData) {
    "use server";
    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  }

  return (
    <div className="container">
      <h2 className="text-lg mt-6">Create a New Company</h2>
      <p className="text-gray-500 text-sm mb-2">
        To create a job listing your first need to register a company
      </p>
      <form action={handleNewCompanyForm} className="flex gap-2">
        <input
          name="newCompanyName"
          className="p-2 border border-gray-400 rounded-md"
          type="text"
          placeholder="company name"
        />
        <button
          type="submit"
          className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md"
        >
          Create company
        </button>
      </form>
    </div>
  );
};

export default NewCompanyPage;
