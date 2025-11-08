import React from "react";
import PostCard from "./component/PostCard";

type Props = {};

function page({}: Props) {
  return <div>
    {[...Array(4)].map((item,index) => <PostCard key={index} />)}
  </div>;
}

export default page;
