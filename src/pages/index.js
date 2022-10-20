import { Box } from "@mui/material";
import React from "react";
import { Axios } from "../apis";
import { Apis } from "../apis/const";
import ProductCard from "../components/common/Cards/ProductCard";

const Home = ({ products }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 1,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {products.map((product) => {
        return (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        );
      })}
    </Box>
  );
};

export async function getStaticProps() {
  const res = await Axios.get(Apis.GetProducts);
  return {
    props: {
      products: res.data,
    },
  };
}

export default Home;
