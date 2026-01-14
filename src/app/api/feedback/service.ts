import Feedback from "@/models/feedbackModel";

export async function createFeedback(data: {
  workspace: string;
  deliverable: string;
  author: string;
  message: string;
}) {
  return Feedback.create(data);
}
