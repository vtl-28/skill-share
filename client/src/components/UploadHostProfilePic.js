import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Spinner } from "react-bootstrap";
import { TalkContext } from "../Context/TalkProvider";
import usePostImage from "../hooks/usePostImage";

const UploadHostProfilePic = () => {
  const [picIsLoading, setPicIsLoading] = useState(false);
  const { picUrl } = useContext(TalkContext);
  const { postDetails } = usePostImage();

  return (
    <div>
      <FormControl className="mb-3">
        <FormLabel className="font-link">Pic</FormLabel>
        <Input
          type="file"
          name="pic"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        {picIsLoading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            variant="secondary"
            className="z-auto"
          />
        )}
      </FormControl>
    </div>
  );
};

export default UploadHostProfilePic;
