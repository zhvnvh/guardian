import React from "react";

import { Link, useLoaderData } from "react-router-dom";

import { Button, Text, Image, Box } from "@chakra-ui/react";

import parse from "html-react-parser";

import img from "../oldimg.jpg";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const ArticleRoute: React.FC = () => {
  const article: any = useLoaderData();
  console.log(article);

  const publicationDate = new Date(article.webPublicationDate);
  const formattedDate = publicationDate.toLocaleDateString("en-US", options);
  let imgSrc = img;
  if (article.fields.thumbnail !== undefined) {
    imgSrc = article.fields.thumbnail;
  }

  return (
    <div>
      <Link to={"/"}>
        <Button>Go back</Button>
      </Link>
      <Text
        fontWeight={300}
        fontSize={"2.125rem"}
        lineHeight={"2.125rem"}
        textColor={"#121212"}
        ml={0}
        textAlign={"left"}
      >
        {article.fields.headline}
      </Text>
      <Text
        fontWeight={300}
        fontSize={"2.125rem"}
        lineHeight={"38px"}
        fontStyle={"italic"}
        textColor={"#C74600"}
        ml={0}
        textAlign={"left"}
      >
        {article.fields.byline}
      </Text>
      <Box maxW={"540px"} textAlign={"left"}>
        {parse(article.fields.standfirst)}
      </Box>
      <Text fontSize="sm" color={"grey"} m={[0, 1.5]} textAlign={"left"}>
        {formattedDate}
      </Text>
      {/* <Image src={imgSrc} w={"100%"}></Image> */}
      {parse(article.blocks.main.bodyHtml)}
      <Box textAlign={"justify"}>{parse(article.fields.body)}</Box>
    </div>
  );
};

export default ArticleRoute;
