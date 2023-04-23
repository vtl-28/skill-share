import { Input } from "@chakra-ui/react";
import React from "react";

import usePostImage from "../hooks/usePostImage";

const UpdateHostProfilePic = () => {
  const { postDetails } = usePostImage();

  return (
    <div>
      <label className="label">
        <Input
          type="file"
          name="pic"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <span className="text-white font-semibold xs:text-sm">Upload New</span>
      </label>
    </div>
  );
};

export default UpdateHostProfilePic;
