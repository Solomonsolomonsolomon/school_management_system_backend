import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const NotFoundComponent = (props: React.PropsWithChildren) => {
  return (
    <section className=" dark:bg-gray-900 h-[100vh] gap-0 flex justify-center w-full items-center flex-wrap">
      <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
      <span className="text-2xl ml-1">Oops!. {props.children}</span>
    </section>
  );
};

export default NotFoundComponent;
