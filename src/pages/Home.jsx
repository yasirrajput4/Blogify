import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

/**
 * Home — same appwriteService.getPosts() call and posts state. Added a
 * `loading` flag (purely additive, doesn't change the fetch logic) so we
 * can distinguish "still loading" from "no posts yet" and show a proper
 * skeleton instead of nothing. Empty and loaded states both redesigned.
 */
function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-12">
        <Container>
          <div className="flex flex-wrap -m-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="p-2 w-1/2 sm:w-1/3 lg:w-1/4">
                <div className="skeleton rounded-lg aspect-[16/10] mb-3" />
                <div className="skeleton rounded h-4 w-3/4" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-24 text-center">
        <Container>
          <p className="font-mono text-xs uppercase tracking-widest text-clay mb-3">
            Blogify
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink max-w-lg mx-auto">
            Sign in to start reading
          </h1>
          <p className="mt-3 text-clay max-w-md mx-auto">
            Stories from writers worth following. Log in or create an account to
            see what's new.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-12">
      <Container>
        <h1 className="font-display text-2xl font-semibold text-ink mb-8">
          Latest stories
        </h1>
        <div className="flex flex-wrap -m-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/2 sm:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
