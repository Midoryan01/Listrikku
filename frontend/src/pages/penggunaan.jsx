import React, { useEffect } from 'react';
import Layout from './layout';
import PenggunaanTable from '../components/penggunaan/listPenggunaan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../features/authSlice";

const Penggunaan = () => {
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
        <PenggunaanTable />
      </Layout>
    </div>
  );
};

export default Penggunaan;
