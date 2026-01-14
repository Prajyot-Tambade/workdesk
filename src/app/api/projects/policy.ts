export const projectPolicy = {
  create: ["owner", "freelancer"],
  update: ["owner", "freelancer", "team"],
  view: ["owner", "freelancer", "team", "client"],
};