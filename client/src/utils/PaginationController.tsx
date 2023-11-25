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
  function pagesRender() {
    let el = [];
    for (let i = 1; i <= totalPages; i++) {
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
        pages:{pagesRender()}
      </section>
    </div>
  );
};

export default PaginationController;
