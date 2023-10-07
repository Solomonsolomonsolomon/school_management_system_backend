import React from "react";
import axios from "../../../api/axios";
import Loading from "../../Loading";
import NotFoundComponent from "../../../utils/404Component";
let busUrl = "/bus";

const AllStudentsTakingBus: React.FC = () => {
  let [loading, setLoading] = React.useState<boolean>(false);
  let [students, setStudents] = React.useState<any[]>([]);
  React.useEffect(() => {
    let controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${busUrl}/students/all`, {
          signal: controller.signal,
        });
        console.log(res);
        setStudents(res.data?.bus);
      } catch (error) {
        console.log(students.length)
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);
  if (loading) return <Loading />;
  if (!students.length)
    return <NotFoundComponent>No students enroled for bus</NotFoundComponent>;
  return (
    <>
      <main>
        <p>All Students</p>
      </main>
    </>
  );
};
export default AllStudentsTakingBus;
