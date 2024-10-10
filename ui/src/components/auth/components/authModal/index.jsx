import React, { useState } from "react";
import Web3 from "web3";

import { useDispatch } from "react-redux";
import { openModal } from "../../../../store/slices/auth/isAuthModalOpen";

import { store } from "../../../../store";
import { authorizeUser } from "../../../../store/slices/auth/userSlice";
import { getNonce } from "../../../../store/api/endpoints/auth/getNonce";
import { authenticateUser } from "../../../../store/api/endpoints/auth/authenticateUser";

import { CloseIcon } from "../../../../svgs/CloseIcon";
import metamask from "../../../../assets/metamask.webp";

import { sessionStorageKeys } from "../../../../lib/sessionStorageKeys";

import styles from "./authModal.module.scss";

export const AuthModal = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [nonce, setNonce] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      setWalletAddress(accounts[0]);
    } else {
      alert("Please install Metamask");
    }
  };

  const requestNonce = async () => {
    try {
      const { data: res, error } = await store.dispatch(
        getNonce.initiate({ walletAddress })
      );
      if (error || !res)
        throw new Error(error.message || "Failed to get nonce");
      setNonce(res.nonce);
    } catch (error) {
      setError(error.message);
    }
  };

  const authenticateAndSignMessage = async () => {
    try {
      if (!window.ethereum || !walletAddress || !nonce) {
        throw new Error(" Missing data");
      }

      const web3 = new Web3(window.ethereum);
      const message = `${process.env.REACT_APP_AUTHENTICATION_MESSAGE} ${nonce}`;

      const signature = await web3.eth.personal.sign(
        message,
        walletAddress,
        ""
      );

      const { data: res, error } = await store.dispatch(
        authenticateUser.initiate({
          walletAddress,
          signature,
        })
      );

      if (error || !res)
        throw new Error(error?.message || "Failed to authenticate message");

      dispatch(
        authorizeUser({
          walletAddress: walletAddress,
        })
      );

      sessionStorage.setItem(sessionStorageKeys.AUTH_TOKEN, res.token);

      setIsAuthenticated(true);
      dispatch(openModal(false));
    } catch (error) {
      setError(error.message);
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <div
        className={styles.opaque_background}
        onClick={() => dispatch(openModal(false))}
      />
      <div className={styles.auth_modal_container}>
        <div className={styles.auth_modal_wrap}>
          <button
            title="Close auth modal"
            className={styles.close_modal_button}
            onClick={() => dispatch(openModal(false))}
          >
            <CloseIcon className={styles.close_modal_icon} />
          </button>

          <div className={styles.auth_modal_header}>
            <img
              src={metamask}
              alt="metamask logo"
              className={styles.metamask}
            />
            <span className={styles.auth_modal_header_title}>
              Metamask Authentication
            </span>
          </div>
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              className={styles.auth_actions_button}
            >
              Connect Metamask
            </button>
          ) : (
            <div className={styles.verified_wallet_step}>
              <div className={styles.wallet_info}>
                <span className={styles.wallet_label}>Wallet verified</span>
                <p className={styles.wallet_value}>{walletAddress}</p>
              </div>
              {!nonce ? (
                <button
                  onClick={requestNonce}
                  className={styles.auth_actions_button}
                >
                  Get nonce
                </button>
              ) : (
                <button
                  onClick={authenticateAndSignMessage}
                  className={styles.auth_actions_button}
                >
                  Authenticate
                </button>
              )}
            </div>
          )}

          {isAuthenticated && (
            <span className={styles.auth_modal_success}>Success!</span>
          )}
          {error && <span className={styles.auth_modal_error}>{error}</span>}
        </div>
      </div>
    </>
  );
};
