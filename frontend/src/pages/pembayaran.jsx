import React, { useEffect } from "react";
import Layout from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../features/authSlice";
import ListPembayaran from "../components/pembayaran/listPembayaran";

const Pembayaran = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserData = async () => {
      await dispatch(fetchCurrentUser());
    };

    getUserData();
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && isError) {
      navigate("/");
    }
  }, [isError, isLoading, navigate]);

  return (
    <div>
      <Layout>
        <ListPembayaran />
      </Layout>
    </div>
  );
};

export default Pembayaran;
