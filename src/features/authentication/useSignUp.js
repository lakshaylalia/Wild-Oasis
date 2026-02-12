import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify new account from user's email address."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { signUp, isLoading };
}
