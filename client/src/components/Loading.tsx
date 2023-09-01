










const Loading=()=>{
return (
  <>
    <div className="flex w-[100%] justify-center items-center h-[100%]">
      <svg
        className="animate-spin -ml-1 mr-3 h-13 w-12   text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647z"
        ></path>
      </svg>
    </div>
  </>
);
}
export default Loading;