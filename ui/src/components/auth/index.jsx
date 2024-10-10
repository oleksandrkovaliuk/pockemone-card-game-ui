import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkSession } from "../../store/thunks/checkSession";
import { getUserSelector } from "../../store/selectors/auth/getUser";
import { openModal } from "../../store/slices/auth/isAuthModalOpen";

import { isAuthModalOpenSelector } from "../../store/selectors/auth/isAuthModalOpen";

import { LogInIcon } from "../../svgs/LoginIcon";

import { AuthModal } from "./components/authModal";
import { AuthorizedUserMenu } from "./components/userNavModal";

import styles from "./auth.module.scss";

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(getUserSelector);
  const { isModalOpen } = useSelector(isAuthModalOpenSelector);

  useEffect(() => {
    dispatch(checkSession())
      .unwrap()
      .catch(() => {
        navigate("/", { replace: true });
      });
  }, [dispatch, navigate]);

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
