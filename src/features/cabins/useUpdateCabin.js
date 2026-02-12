import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useUpdateCabin() {
    const queryClient = useQueryClient();
      const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // mutationFn: (newCabin) => createEditCabin(newCabin),
    mutationFn: ({ newCabin, editId }) => createEditCabin(newCabin, editId),
    onSuccess: () => {
      toast.success("Cabin successfully updated!");
      queryClient.invalidateQueries({ queryKey: "cabins" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {isEditing, editCabin};
}