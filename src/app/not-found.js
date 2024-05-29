import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="bg-white w-screen h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#f73d7b] dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the
            home page.{" "}
          </p>
          <a
            href="/"
            className="flex items-center gap-1 px-6 py-3 mx-auto mt-4 btn-primaryy w-max"
          >
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
