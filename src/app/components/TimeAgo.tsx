"use client";
import ReactTimeAgo from "react-timeago";
import React from "react";

const TimeAgo = ({ createdAt }: { createdAt: string }) => {
  return (
    <>
      <ReactTimeAgo date={createdAt} />
    </>
  );
};

export default TimeAgo;
