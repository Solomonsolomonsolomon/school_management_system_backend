import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faDownload } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import Modal from "react-modal";
Modal.setAppElement("#root");
let subtitle: any;
subtitle;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
};
let user = sessionStorage.getItem("user");
let details = {
  _id: "",
};
typeof user === "string" ? (details = JSON.parse(user)) : "";
interface Years {
  yearId: string;
  yearName: string;
  termName: string;
  termId: string;
}
import axios from "../../api/axios";
import ReportCard from "./ReportCard";
let baseUrl = "/student";
const AllResults: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let [query, setQuery] = React.useState<string>("");
  console.log(query);
  let [isLoading, setLoading] = React.useState<boolean>(false);
  const [reportCard, setReportCard] = React.useState<any>(null);
  const [selectedReport, setSelectedReport] = React.useState<Years | null>(
    null
  );
  let [reportClicked, setReportClicked] = React.useState<number>(0);
  const printRef = React.useRef<HTMLDivElement>(null);
  const closeModal = () => {
    setQuery("");
    setIsModalOpen(false);
  };
  const handleSelectReport = async (report: Years) => {
    console.log(selectedReport);
    setIsModalOpen(true);

    (async () => {
      try {
        setLoading(true);
        setSelectedReport(report);
        let res = await axios.get(
          `${baseUrl}/${details._id}/result/${report?.yearId}/${report?.termId}`
        );
        setReportCard(res?.data?.result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(reportCard);
      }
    })();
  };

  //handle file download
  React.useEffect(() => {
    const handleResultDownload = async () => {
      const element = printRef.current;
      if (element) {
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`reportCard.pdf`);
      }
    };
    handleResultDownload();
  }, [reportClicked]);
  let [years, setYears] = React.useState<Years[]>([]);
  React.useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${baseUrl}/${details._id}/results/all`, {
          signal: controller.signal,
        });
        setYears(res?.data?.years);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, []);
  if (isLoading) return <Loading />;
  return (
    <div>
      <p className="text-center font-bold border shadow-2xl shadow box-border ">
        Results here
      </p>
      {years.length ? (
        years.map((timeFrame, index: number) => {
          return (
            <section key={index}>
              <p
                className="text-blue-600 mt-3"
                key={`${timeFrame.yearId}${timeFrame.termId}`}
                onClick={(_) => {
                  handleSelectReport(timeFrame);
                }}
              >
                {timeFrame.termName} {timeFrame.yearName}
              </p>
            </section>
          );
        })
      ) : (
        <div className="grid justify-center justify-items-center place-items-center gap-2 text-blue-600 items-center">
          <p className="text-2xl">No Results Found</p>
          <small className="text-red-900">
            please contact admin if this is a fee issue
          </small>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {reportCard && selectedReport && (
          <div
            className="mt-5  grid grid-cols-1 w-full h-full"
            ref={printRef}
          >
            <ReportCard
              reportCardDetails={reportCard}
              selectedReportDetails={selectedReport}
            />
          </div>
        )}
        <div className="absolute top-1 left-1 cursor-pointer border-1">
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            onClick={() => {
              setReportClicked((prev) => prev + 1);
            }}
            size="lg"
          ></FontAwesomeIcon>{" "}
        </div>
        <div className="absolute top-1 right-1">
          <Button buttonType={2} onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} size="sm"></FontAwesomeIcon>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AllResults;
