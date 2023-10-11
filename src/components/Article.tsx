import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import img from "../oldimg.jpg";
import { Link } from "react-router-dom";

interface ArticleProps {
  apiUrl: string;
  fields: any;
  id: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  sectionId: string;
  sectionName: string;
  type: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
}

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const Article: React.FC<ArticleProps> = ({
  apiUrl,
  fields,
  id,
  isHosted,
  pillarId,
  pillarName,
  sectionId,
  sectionName,
  type,
  webPublicationDate,
  webTitle,
  webUrl,
}) => {
  const publicationDate = new Date(webPublicationDate);
  const formattedDate = publicationDate.toLocaleDateString("en-US", options);
  let imgSrc = img;

  if (fields !== undefined) {
    imgSrc = fields.thumbnail;
  }

  return (
    <Box
      m="auto"
      mb={5}
      w={300}
      h={350}
      bg="#f2f2f2"
      borderRadius={10}
      textAlign={"left"}
    >
      <Image width={300} height={180} borderTopRadius={10} src={imgSrc}></Image>
      <Text fontSize="sm" color={"grey"} m={[0, 1.5]}>
        {formattedDate}
      </Text>
      <Text ml={1.5} fontSize="md">
        {webTitle}
      </Text>
      <Box ml={"auto"}>
        <Link to={`article/${btoa(id)}`}>
          <Button>... more</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Article;
