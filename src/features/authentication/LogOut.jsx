import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";

import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { logOut, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logOut}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
