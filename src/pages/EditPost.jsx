import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

/**
 * EditPost — same getPost(slug)/navigate("/") logic. The only change is
 * the loading state: previously returned `null` (blank screen) while
 * fetching; now shows a skeleton matching the PostForm dashboard layout
 * so navigation doesn't feel like a flash of nothing.
 */
function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="py-10">
        <Container>
          <div className="skeleton rounded h-8 w-1/3 mb-8" />
          <div className="flex flex-wrap gap-6">
            <div className="w-full lg:w-2/3 space-y-6">
              <div className="skeleton rounded-lg h-40" />
              <div className="skeleton rounded-lg h-96" />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="skeleton rounded-lg h-72" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
