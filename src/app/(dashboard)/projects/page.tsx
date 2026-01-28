"use client";
import { DashboardHeader } from "@/components/Dashboard/dashboard-header";
import ProjectCard, {
  ProjectCardType,
} from "@/components/Dashboard/projectCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [activeTab, setActiveTab] = useState("all");

  const projects: ProjectCardType[] = [
    {
      id: 1,
      projectLogo: "https://github.com/shadcn.png",
      title: "Website Redesign",
      description: "Revamping the marketing website for better conversions.",
      status: "In Progress",
      tags: ["Web Design", "UI/UX"],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 14,
      budget: 18000,
    },
    {
      id: 2,
      projectLogo: "https://github.com/vercel.png",
      title: "SaaS Dashboard",
      description: "Building a scalable dashboard for analytics.",
      status: "Client Review",
      tags: ["Product Design", "Dashboard", "SaaS"],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 7,
      budget: 25000,
    },
    {
      id: 3,
      projectLogo: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
      title: "Brand Identity",
      description: "Complete branding package for a startup.",
      status: "Completed",
      tags: ["Branding", "Logo Design", "Marketing"],
      deadline: Date.now() - 1000 * 60 * 60 * 24 * 3,
      budget: 12000,
    },
    {
      id: 4,
      projectLogo: "https://github.com/tailwindlabs.png",
      title: "Landing Page",
      description: "High-converting landing page for product launch.",
      status: "In Progress",
      tags: ["Web Design", "Landing Page", "Marketing"],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 21,
      budget: 9000,
    },
    {
      id: 5,
      projectLogo: "https://github.com/reactjs.png",
      title: "Design System",
      description: "Reusable components and design tokens.",
      status: "Client Review",
      tags: ["Product Design", "Design System", "UI"],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 10,
      budget: 30000,
    },
    {
      id: 6,
      projectLogo: "https://github.com/figma.png",
      title: "Mobile App UI",
      description: "Modern UI for a cross-platform mobile app.",
      status: "Completed",
      tags: ["Mobile Design", "UI/UX", "Product Design"],
      deadline: Date.now() - 1000 * 60 * 60 * 24 * 20,
      budget: 22000,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter(
          (task) => task.status.toLocaleLowerCase() === activeTab,
        );

  const createNewProject = (newProjectData: FormData) => {
    const projectLogo = newProjectData.get("project-logo");
    const projectTitle = newProjectData.get("project-title");
    const projectDescription = newProjectData.get("project-description");
    const projectDeadline = newProjectData.get("project-deadline");

    if (projectTitle) {
      toast.error("Please enter the required values!");
      return;
    }
  };

  return (
    <section>
      <DashboardHeader title="Projects">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>
                Added the details of your new project
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createNewProject(new FormData(e.currentTarget));
              }}
            >
              <FieldGroup>
                <FieldSet>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="project-logo">
                        Project-logo
                      </FieldLabel>
                      <Input
                        name="project-logo"
                        id="project-logo"
                        type="file"
                      />
                      <FieldDescription>
                        Select a project logo to upload.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="project-title">
                        Project Title <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input name="project-title" id="project-title" required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="project-description">
                        Project Description
                      </FieldLabel>
                      <Input
                        name="project-description"
                        id="project-description"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="project-deadline">
                        Project Deadline
                      </FieldLabel>
                      <Input
                        name="project-deadline"
                        id="project-deadline"
                        type="date"
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
              <DialogFooter className="mt-8">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </DashboardHeader>
      <div className="p-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in progress">In Progress</TabsTrigger>
            <TabsTrigger value="client review">Client Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="grid grid-cols-3 gap-2">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <TabsContent value="client review"></TabsContent>
          <TabsContent value="completed"></TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default page;
