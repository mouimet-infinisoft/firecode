export const config = {
  APIURL: "https://api.overlay-tech.com",
  ROUTES: {
    login: "api/login",
    projects: "api/projects",
    components: (projectId: string, componentId: string) =>
      `api/projects/${projectId}/component-sets/${componentId}/components`,
  },
};
