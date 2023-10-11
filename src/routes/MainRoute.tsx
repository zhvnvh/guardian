import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import SearchBar from "../components/SearchBar";
import Article from "../components/Article";
import { paginationArticles } from "../redux/slices/articlesSlice";

import type { RootState, AppDispatch } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MainRoute() {
  const articles = useSelector((state: RootState) => state.articles.results);
  const pageValue = useSelector((state: RootState) => state.articles.page);

  const itemsValue = useSelector((state: RootState) => state.filter.items);
  const orderValue = useSelector((state: RootState) => state.filter.order);
  const searchValue = useSelector((state: RootState) => state.filter.search);
  const fromDateValue = useSelector(
    (state: RootState) => state.filter.fromDate
  );
  const toDateValue = useSelector((state: RootState) => state.filter.toDate);
  const dispatch = useDispatch<AppDispatch>();

  const getArticles = () => {
    const params = {
      searchValue,
      orderValue,
      itemsValue,
      fromDateValue,
      toDateValue,
      pageValue,
    };
    dispatch(paginationArticles(params));
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && articles.length) {
      getArticles();
    }
  }, [inView]);
  return (
    <div>
      <SearchBar></SearchBar>
      <Grid templateColumns="repeat(3, 1fr)">
        {articles.map((article: any) => {
          return (
            <GridItem key={article.id}>
              <Article {...article} />
            </GridItem>
          );
        })}
      </Grid>
      <div ref={ref}></div>
    </div>
  );
}
