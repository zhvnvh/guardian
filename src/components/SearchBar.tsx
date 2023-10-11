import { Box, Input, Button, Select, Text } from "@chakra-ui/react";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  items,
  order,
  search,
  fromDate,
  toDate,
} from "../redux/slices/filterSlice";
import { fetchArticles } from "../redux/slices/articlesSlice";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const range = Array.from({ length: 50 }, (value, index) => index);

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
    };
    dispatch(fetchArticles(params));
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <Box bg="#659dbd" m={2} p={2} borderRadius={10}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Input
            mr={10}
            bg="gray.100"
            value={searchValue}
            onChange={(e) => {
              dispatch(search(e.target.value));
            }}
          ></Input>
          <Button onClick={getArticles}>Find</Button>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="space-between"
          mt={2}
        >
          <Box
            mr={10}
            // display="flex"
            // alignItems="left"
            // flexDirection={"column"}
          >
            <Text color="var(--chakra-colors-gray-100)">Order by:</Text>
            <Select
              placeholder=""
              bg="var(--chakra-colors-gray-100)"
              value={orderValue}
              onChange={(e) => {
                dispatch(order(e.target.value));
              }}
            >
              <option value="relevance">relevance</option>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </Select>
          </Box>
          <Box>
            <Text color="var(--chakra-colors-gray-100)">Items on page:</Text>
            <Select
              placeholder=""
              bg="var(--chakra-colors-gray-100)"
              value={itemsValue}
              onChange={(e) => {
                dispatch(items(Number(e.target.value)));
              }}
            >
              {range.map((index) => {
                return (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                );
              })}
            </Select>
          </Box>
          <Box ml={10}>
            <Text color="var(--chakra-colors-gray-100)">Date from:</Text>
            <DatePicker
              selected={fromDateValue ? new Date(fromDateValue) : null}
              onChange={(e) => {
                dispatch(fromDate(e?.getTime()));
              }}
            ></DatePicker>
          </Box>
          <Box ml={10}>
            <Text color="var(--chakra-colors-gray-100)">Date to:</Text>
            <DatePicker
              selected={toDateValue ? new Date(toDateValue) : null}
              onChange={(e) => {
                dispatch(toDate(e?.getTime()));
              }}
            ></DatePicker>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SearchBar;
