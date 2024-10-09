import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserSelector } from "../../../../store/selectors/auth/getUser";
import { logOutUser } from "../../../../store/slices/auth/userSlice";
import { setClearUserPokemonSelection } from "../../../../store/slices/userGameEnvirment/userPokemonSelection";

import authorizedUserIcon from "../../../../assets/metamask.webp";

import styles from "./userNavModal.module.scss";

export const AuthorizedUserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(getUserSelector);

  return (
    <div className={styles.auth_user_container}>
      <button className={styles.authorized_user_button} title="Authorized user">
        <img
          src={authorizedUserIcon}
          alt={user?.walletAddress}
          className={styles.authorized_user_icon}
        />
      </button>
      <ul className={styles.user_nav}>
        <li className={styles.user_nav_item} title="Wallet address">
          <span className={styles.user_nav_label}>{user?.walletAddress}</span>
        </li>
        <li className={styles.user_nav_item}>
          <button
            title="Log out"
            onClick={() => {
              navigate("/");
              dispatch(logOutUser());
              dispatch(setClearUserPokemonSelection());
            }}
            className={styles.log_out_button}
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};
