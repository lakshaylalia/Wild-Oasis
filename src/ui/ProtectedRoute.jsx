import {useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 10vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const naviagte = useNavigate();
  // 1. Loading the authenicated user
  const { isLoading, isAuthenicated } = useUser();
  // 2. If the user is not authenticated, redirect to the login page

  useEffect(
    function () {
      if (!isAuthenicated && !isLoading) {
        naviagte("/login");
      }
    },
    [isAuthenicated, isLoading, naviagte]
  );

  // 3. While loading the user, render a loading spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If the user is authenticated, render the children component
  if (isAuthenicated) return children;
}

export default ProtectedRoute;
