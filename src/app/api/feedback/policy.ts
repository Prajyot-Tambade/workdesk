export const projectPolicy = {
  create: ["client"],
  update: ["client"],
  view: ["owner", "freelancer", "team", "client"],
};