import Deliverable from "@/models/deliverableModel";

export async function createDeliverable(data: {
  workspace: string;
  project: string;
  uploadedBy: string;
  fileUrl?: string;
}) {
  return Deliverable.create(data);
}
