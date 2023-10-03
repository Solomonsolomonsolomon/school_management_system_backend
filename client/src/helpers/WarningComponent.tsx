import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const WarningComponent = (props: React.PropsWithChildren) => {
  return (
    <section className="bg-yellow-300 p-4 dark:bg-orange-500">
      <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
      <span className="opacity-60 text-center">{props.children}</span>
    </section>
  );
};

export default WarningComponent