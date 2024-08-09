import React, { useEffect } from "react";
import Layout from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../features/authSlice";
import TagihanTable from "../components/tagihan/listTagihan";

const Tagihan = () => {
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
        <TagihanTable />
      </Layout>
    </div>
  );
};

export default Tagihan;
