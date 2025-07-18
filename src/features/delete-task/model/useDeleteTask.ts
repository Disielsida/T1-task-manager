import { useAppDispatch } from "@shared/hooks/useAppDispatch";
import { deleteTask } from "@entities/task/model/taskSlice";

export const useDeleteTask = () => {
  const dispatch = useAppDispatch();

  const removeTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return { removeTask };
};
