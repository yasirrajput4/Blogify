import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

/**
 * PostCard — same destructured props ($id, title, featuredImage), same
 * appwriteService.getFilePreview call. Redesigned from an image-on-top
 * card into a horizontal editorial entry: thumbnail on the side, a
 * left "spine" rule that turns terracotta on hover — this spine motif
 * repeats across the app as the visual signature.
 */
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article
        className="
          h-full flex flex-col
          bg-paper-dim rounded-lg overflow-hidden
          border-l-2 border-rule
          transition-all duration-200 ease-out
          group-hover:border-terracotta group-hover:-translate-y-0.5 group-hover:shadow-md
        "
      >
        <div className="w-full aspect-[16/10] overflow-hidden bg-rule">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-4 flex-1 flex items-end">
          <h2 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-terracotta transition-colors duration-150">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
