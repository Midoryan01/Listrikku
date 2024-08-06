import React, {useEffect}from 'react';
import Layout from './layout';
import PenggunaanTable from '../components/listPenggunaan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../features/authSlice";


const Penggunaan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/admin");
    }
  }, [isError, navigate]);

  return (
    <div>
      <Layout>
        <PenggunaanTable/>
      </Layout>
    </div>
  );
};

export default Penggunaan;
