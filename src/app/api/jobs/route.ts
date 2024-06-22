import { JobModel } from "@/models/Job";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) throw new Error("No id provided");

  await mongoose.connect(process.env.MONGO_URI as string);
  await JobModel.deleteOne({
    _id: id,
  });
  return Response.json(true);
}
