import React from "react";
import { Container } from "../components/container/Container";
import { PostForm } from "../components/post-form/PostForm";

// AddPost — unchanged: just renders PostForm with no `post` prop, so
// PostForm's submit() takes the "create" branch.
function AddPost() {
  return (
    <div className="py-10">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
