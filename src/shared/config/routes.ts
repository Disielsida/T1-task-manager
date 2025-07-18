export const ROUTES = {
  HOME: "/",
  TASK: (id: string = ":id") => `/task/${id}`,
  ADD_TASK: "/task/new",
};
