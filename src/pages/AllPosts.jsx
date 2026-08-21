import { useState, useEffect } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
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

  return (
    <div className="w-full py-12">
      <Container>
        <h1 className="font-display text-2xl font-semibold text-ink mb-8">
          All stories
        </h1>

        {posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-rule rounded-lg">
            <p className="text-clay">
              No stories yet. Be the first to write one.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap -m-2">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/2 sm:w-1/3 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
