import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { store } from "../../store";
import { getUserSelector } from "../../store/selectors/auth/getUser";
import { openModal } from "../../store/slices/auth/isAuthModalOpen";
import { authorizeUser, logOutUser } from "../../store/slices/auth/userSlice";
import { isAuthModalOpenSelector } from "../../store/selectors/auth/isAuthModalOpen";
import { verifyAndGetUser } from "../../store/api/endpoints/auth/verifyAndGetUser";

import { LogInIcon } from "../../svgs/LoginIcon";

import { AuthModal } from "./components/authModal";
import { AuthorizedUserMenu } from "./components/userNavModal";
import { sessionStorageKeys } from "../../lib/sessionStorageKeys";

import styles from "./auth.module.scss";

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(getUserSelector);
  const { isModalOpen } = useSelector(isAuthModalOpenSelector);

  const handleVerifyAndGetUser = useCallback(async () => {
    try {
      const token = sessionStorage.getItem(sessionStorageKeys.AUTH_TOKEN);
      if (!token) {
        navigate("/");

        return;
      }

      const { data: res, error } = await store.dispatch(
        verifyAndGetUser.initiate({ token })
      );

      if (error || !res.user) {
        navigate("/");
        dispatch(logOutUser());
        dispatch(openModal(true));
      }

      dispatch(
        authorizeUser({
          walletAddress: res.user.walletAddress,
        })
      );
    } catch (error) {
      navigate("/");
      dispatch(openModal(true));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    handleVerifyAndGetUser();
  }, [handleVerifyAndGetUser]);

  return (
    <>
      {isModalOpen && <AuthModal />}
      {user?.walletAddress ? (
        <AuthorizedUserMenu />
      ) : (
        <button
          title="Authorize"
          className={styles.auth_button}
          onClick={() => dispatch(openModal(true))}
        >
          <LogInIcon className={styles.auth_icon} />
        </button>
      )}
    </>
  );
};
