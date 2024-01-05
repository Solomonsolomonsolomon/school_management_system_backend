import React from "react";
interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
}

const PaginationController: React.FC<PaginationProps> = ({
  totalPages,
  page,
  setPage,
}) => {
  let maxPages = 5;
  let first = page - Math.floor(maxPages / 2);
  let last = page + Math.floor(maxPages / 2);
  function pagesRender() {
    if (first < 1) {
      first = 1;
      last = 1 + 4;
    }
    if (last > totalPages) {
      last = totalPages;
    }
;
    let el = [];
    // i=1 i<=totalPages
    for (let i = first; i <= last; i++) {
      el.push(
        <span
          key={i}
          className={`1ml-2  px-2 ${
            page === i ? "bg-blue-900 text-white" : ""
          } bg-blue-50  rounded-full`}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return el;
  }
  return (
    <div>
      <section className="flex flex-wrap justify-start mt-20 gap-4 bg-white dark:bg-gray-900 p-4  absolute bottom-0 ">
        {" "}
        pages:{" "}
        <button
          className="bg-blue-500 p-1 rounded text-white"
          onClick={() => {
            setPage(1);
          }}
        >
          First
        </button>
        {pagesRender()}
        <button
          className="bg-blue-500 p-1 rounded text-white"
          onClick={() => {
            setPage(totalPages);
          }}
        >
          Last
        </button>
      </section>
    </div>
  );
};

export default PaginationController;
