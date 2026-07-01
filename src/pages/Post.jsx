import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

/**
 * Post — getPost/deletePost/isAuthor logic is unchanged. Layout redesigned
 * into a reading-page format: centered title block, a thin byline/meta
 * rail (read-time, derived from post.content — additive only), and the
 * featured image as a wide banner instead of a bordered box. Added a
 * copy-link button as the small clipboard micro-feature suggested in
 * the brief; it only touches local `copied` UI state, nothing in the
 * data layer.
 */
export default function Post() {
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const wordCount = post
    ? post.content
        .replace(/<[^>]+>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  if (!post) {
    return (
      <div className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="skeleton rounded h-4 w-24 mb-6" />
            <div className="skeleton rounded h-10 w-3/4 mb-8" />
            <div className="skeleton rounded-lg aspect-[16/9] mb-10" />
            <div className="space-y-3">
              <div className="skeleton rounded h-4 w-full" />
              <div className="skeleton rounded h-4 w-full" />
              <div className="skeleton rounded h-4 w-2/3" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Meta rail */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-clay">
              {readMinutes} min read
            </span>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-transparent hover:bg-sage/10"
                    textColor="text-sage"
                    className="border border-sage/30"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-transparent hover:bg-terracotta/10"
                  textColor="text-terracotta"
                  className="border border-terracotta/30"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink mb-8">
            {post.title}
          </h1>

          {/* Featured image banner */}
          <div className="w-full rounded-lg overflow-hidden mb-10 border border-rule">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>

          {/* Body content — styled via .browser-css in index.css */}
          <div className="browser-css">{parse(post.content)}</div>

          {/* Copy-link micro-feature */}
          <div className="mt-12 pt-6 border-t border-rule flex items-center gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:text-terracotta transition-colors duration-150"
            >
              {copied ? "Link copied" : "Copy link to this story"}
            </button>
          </div>
        </article>
      </Container>
    </div>
  );
}
