import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PostForm — submit(), slugTransform(), the watch()->setValue() slug-sync
 * effect, and every register() call are unchanged. Restyled into a
 * two-column "creator dashboard": content fields on the left in a card,
 * a sticky publishing rail on the right (image preview, status, submit).
 * Added: a live word/read-time counter, sourced from the existing
 * `watch("content")` value — purely additive, doesn't touch submit logic.
 */
export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Micro-feature: live read-time estimate, derived from the content field.
  // Purely a UI affordance — does not feed into the submitted payload.
  const liveContent = watch("content");
  const wordCount = liveContent
    ? liveContent
        .replace(/<[^>]+>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length
    : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* Page header */}
      <div className="mb-8 flex items-baseline justify-between flex-wrap gap-2">
        <h1 className="font-display text-3xl font-semibold text-ink">
          {post ? "Edit story" : "Write a new story"}
        </h1>
        <span className="font-mono text-xs text-clay">
          {wordCount} words · {readMinutes} min read
        </span>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Main content column */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-white rounded-lg border border-rule p-6 space-y-5">
            <Input
              label="Title"
              placeholder="Give your story a title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="url-friendly-slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>

          <div className="bg-white rounded-lg border border-rule p-6">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* Publishing rail */}
        <div className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-24 bg-paper-dim rounded-lg border border-rule p-6 space-y-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-clay">
              Publish
            </h3>

            <Input
              label="Featured image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />

            {post && (
              <div className="w-full rounded-md overflow-hidden border border-rule">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />

            <Button
              type="submit"
              bgColor={post ? "bg-sage hover:bg-sage/90" : undefined}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? post
                  ? "Updating…"
                  : "Publishing…"
                : post
                  ? "Update story"
                  : "Publish story"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
