import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "motion/react";
import FormError from "../components/FormError";
import Select from "react-select";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useWallet from '../components/useWallet';
import { ethers } from "ethers";
import { router } from "@inertiajs/react";

const Request = ({ requests, districts}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [reqID, setReqID] = useState("");
  const [isRequestViewClicked, setIsRequestViewClicked] = useState(false);

  const handleRequestViewClick = (id) => {
    setReqID(id);
    setIsRequestViewClicked(true);
  };

  const distributed = requests.filter((req) => req.status === 'distributed');
  const in_progress = requests.filter((req) => req.status !== 'distributed');

  return (
    <div>
      <Nav />
      <div className="wrapper px-6 h-[calc(100vh-130px)]">
        <div
          className={`create__request bg-clgreen w-fit p-3 rounded-full text-cblack fixed bottom-12 right-12 cursor-pointer hover:bg-cgreen ctransition ${
            isClicked ? "hidden" : ""
          }`}
          onClick={() => setIsClicked(true)}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </div>
        <div className="request__container grid grid-cols-3 gap-4 h-full">
          {/* request history */}
          <div className="sec__1 col-span-3 lg:col-span-1">
            <div className="header">
              <span className="text-gray-500 text-sm md:text-base lg:text-xl">
                Distributed
              </span>
            </div>
            <div className="distributed mt-4">
                  {distributed.map((req, i) => {
                    const created_at = new Date(req.created_at).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    );

                    const bgColors = {
                      pending: "bg-gray-200",
                      approved: "bg-blue-200",
                      received: "bg-green-200",
                      in_transit: "bg-yellow-200",
                      distributed: "bg-violet-200",
                      denied: "bg-red-200",
                    };

                    const textColors = {
                        pending: "text-gray-600",
                        in_transit: "text-yellow-600",
                        approved: "text-blue-600",
                        received: "text-green-600",
                        distributed: "text-violet-600",
                        denied: "text-red-600",
                    };

                    return (
                      <div
                        key={i}
                        className="w-full bg-white shadow-sm flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4"
                        onClick={() => handleRequestViewClick(req.id)}
                      >
                        <div className="title flex flex-col">
                          <span className="font-bold capitalize text-xl lg:text-2xl mb-2">
                            {req.id}
                          </span>
                          <span className="text-xs md:text-sm lg:text-base text-gray-500">
                            {created_at}
                          </span>
                        </div>
                        <div className="req md:space-x-32 lg:space-x-10 hidden md:flex">
                          <div className="households flex flex-col items-center">
                            <span>{req.households}</span>
                            <span className="text-gray-500 text-sm lg:text-base">
                              Households
                            </span>
                          </div>
                          <div className="quantity flex flex-col items-center">
                            <span>{req.quantity}</span>
                            <span className="text-gray-500 text-sm lg:text-base">
                              Quantity
                            </span>
                          </div>
                        </div>
                        <div className="status">
                          <div
                            className={`status__ticker text-sm lg:text-xl min-w-[90px] lg:min-w-[120px] py-2 rounded-full italic text-center ${
                              bgColors[req.status.toLowerCase()]
                            } ${textColors[req.status.toLowerCase()]}`}
                          >
                            <span className="capitalize">
                              {req.status === "in_transit"
                                ? req.status.replace("_", " ")
                                : req.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="sec__2 col-span-3 lg:col-span-2 h-full flex flex-col">
            <div className="header">
              <span className="text-gray-500 text-sm md:text-base lg:text-xl">
                Request
              </span>
            </div>
            <div className="requests mt-4 pb-6 h-full">
                  {in_progress.map((req, i) => {
                    const created_at = new Date(req.created_at).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    );

                    const bgColors = {
                      pending: "bg-gray-200",
                      approved: "bg-blue-200",
                      received: "bg-green-200",
                      in_transit: "bg-yellow-200",
                      distributed: "bg-violet-200",
                      denied: "bg-red-200",
                    };

                    const textColors = {
                        pending: "text-gray-600",
                        in_transit: "text-yellow-600",
                        approved: "text-blue-600",
                        received: "text-green-600",
                        distributed: "text-violet-600",
                        denied: "text-red-600",
                    };

                    return (
                      <div
                        key={i}
                        className="w-full bg-white shadow-sm flex justify-between items-center min-h-[100px] p-4 rounded-xl mb-4"
                        onClick={() => handleRequestViewClick(req.id)}
                      >
                        <div className="title flex flex-col">
                          <span className="font-bold capitalize text-xl lg:text-2xl mb-2">
                            {req.id}
                          </span>
                          <span className="text-xs md:text-sm lg:text-base text-gray-500">
                            {created_at}
                          </span>
                        </div>
                        <div className="req space-x-32 hidden md:flex">
                          <div className="households flex flex-col items-center">
                            <span>{req.households}</span>
                            <span className="text-gray-500 text-sm lg:text-base">
                              Households
                            </span>
                          </div>
                          <div className="quantity flex flex-col items-center">
                            <span>{req.quantity}</span>
                            <span className="text-gray-500 text-sm lg:text-base">
                              Quantity
                            </span>
                          </div>
                        </div>
                        <div className="status">
                          <div
                            className={`status__ticker text-sm lg:text-xl min-w-[90px] lg:min-w-[120px] py-2 rounded-full italic text-center ${
                              bgColors[req.status.toLowerCase()]
                            } ${textColors[req.status.toLowerCase()]}`}
                          >
                            <span className="capitalize">
                              {req.status === "in_transit"
                                ? req.status.replace("_", " ")
                                : req.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
        <Create
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          districts={districts}
        />
        <RequestView
          isRequestViewClicked={isRequestViewClicked}
          setIsRequestViewClicked={setIsRequestViewClicked}
          reqID={reqID}
          requests={requests}
        />
      </div>
    </div>
  );
};

export default Request;

const Create = ({ isClicked, setIsClicked, districts }) => {
  const { data, setData, errors, post } = useForm({
    title: "",
    reason: "",
    households: 0,
    quantity: 0,
    file: null,
    districts: [],
  });

  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    post("/bdrrm/request", {
      onSuccess: () => {
        setIsClicked(false);
      },
      onError: (error) => {
        console.log(`Error: ${error}`);
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("file", file);
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  return (
    <AnimatePresence>
      {isClicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1] },
          }}
          exit={{ opacity: 0 }}
          onClick={() => setIsClicked(false)}
          className="fixed inset-0 bg-black/25 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1] },
            }}
            exit={{ opacity: 0, y: 10 }}
            className={`relative w-full h-full bg-cwhite md:w-[80vw] md:h-[90vh] lg:w-[40vw]  md:rounded-xl flex flex-col justify-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1"
              onClick={() => setIsClicked(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                />
              </svg>
            </div>
            <form className="mt-12 w-full px-[2rem] md:px-[6rem]">
              <p className="text-4xl md:text-2xl font-bold cheader">
                Request Relief
              </p>
              <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                <input
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                  className="bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize"
                  required={true}
                  placeholder="Request Title"
                />
                {errors.title && <FormError error={errors.title} />}
              </div>
              <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                <textarea
                  type="text"
                  id="reason"
                  required={true}
                  value={data.reason}
                  onChange={(e) => setData("reason", e.target.value)}
                  className="bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl resize-none min-h-[150px]"
                  placeholder="Reason for Request"
                ></textarea>
                {errors.reason && <FormError error={errors.reason} />}
              </div>
              <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                <input
                  type="number"
                  id="households"
                  value={data.households}
                  onChange={(e) => setData("households", e.target.value)}
                  className="bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize"
                  required={true}
                  placeholder="Number of Affected Households"
                />
                {errors.households && <FormError error={errors.households} />}
              </div>
              <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                <input
                  type="number"
                  id="quantity"
                  value={data.quantity}
                  onChange={(e) => setData("quantity", e.target.value)}
                  className="bg-transparent border border-black rounded-lg focus:border-cgreen py-4 text-xl placeholder:capitalize"
                  required={true}
                  placeholder="Number of Relief Boxes Requested"
                />
                {errors.quantity && <FormError error={errors.quantity} />}
              </div>

              <Districts
                districts={districts}
                data={data}
                errors={errors}
                setData={setData}
              />

              <div className="form-field flex flex-col col-span-2 md:col-span-1 mb-6">
                <input
                  type="file"
                  id="attachment"
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                  required={true}
                  placeholder="Number of Relief Boxes Requested"
                />
                <label
                  htmlFor="attachment"
                  className="border border-dashed border-cblack rounded-lg h-[4rem] flex justify-center items-center flex-col text-center"
                >
                  <span className={`text-sm ${!fileName ? "hidden" : ""}`}>
                    {fileName}
                  </span>
                  <span
                    className={`text-sm lg:text-base ${
                      fileName ? "hidden" : ""
                    }`}
                  >
                    Insert Disaster Report
                  </span>
                  {errors.file && <FormError error={errors.file} />}
                </label>
              </div>
              <div className="form-field flex flex-col items-center mt-10">
                <input
                  type="submit"
                  value="Submit"
                  className="px-32 md:px-16 lg:px-36 mx-auto md:mx-0 bg-clgreen text-cblack w-fit rounded-lg border border-black hover:bg-cgreen hover:text-black ctransition cursor-pointer py-4 text-xl"
                  required={true}
                  onClick={(e) => handleSubmit(e)}
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Districts = ({ districts, data, setData, errors }) => {
  const districtOptions = districts.map((district) => ({
    value: district.id,
    label: district.name,
  }));

  return (
    <div className="mb-8 outline-none">
      <Select
        isMulti
        options={districtOptions}
        classNamePrefix="Affected Puroks"
        onChange={(sel) =>
          setData(
            "districts",
            sel.map((opt) => opt.value)
          )
        }
      />
      {errors.districts && <FormError error={errors.districts} />}
    </div>
  );
};

const RequestView = ({
  isRequestViewClicked,
  setIsRequestViewClicked,
  reqID,
  requests,
}) => {
  const relief = reqID && requests.filter((req) => req.id === reqID)[0];
  const [reliefID, setReliefID] = useState("");
  const [reliefQuantity, setReliefQuantity] = useState(0);
  const [isQrScanClicked, setIsQrScanClicked] = useState(false);
  const [shipmentID, setShipmentID] = useState("");

  const handleConfirm = (id, quantity) => {
    setReliefID(id);
    setReliefQuantity(quantity);
    setIsRequestViewClicked(false);
    setIsQrScanClicked(true);
  };

  const handleDistribute = (id) => {
    router.get(`/bdrrm/distribute/${id}`);
  }

  useEffect(() => {
    if(reqID){
        axios.get(`/bdrrm/request/${reqID}`)
            .then((res) => {
                setShipmentID(res.data.id);
            })
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            })
    }
  }, [isRequestViewClicked, reqID])

  return (
    <>
      <AnimatePresence mode="wait">
        {isRequestViewClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1] },
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 flex justify-center items-center"
            onClick={() => setIsRequestViewClicked(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1] },
              }}
              exit={{ opacity: 0, y: 10 }}
              className={`relative w-full min-h-[100vh] md:min-h-[90vh] lg:min-h-[80vh] bg-cwhite md:w-[80vw] lg:w-[40vw]  md:rounded-xl flex flex-col justify-center p-4 md:p-8`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="exit absolute top-12 lg:top-4 right-4 md:right-8 md:top-8 bg-gray-500 rounded-full text-cwhite p-1"
                onClick={() => setIsRequestViewClicked(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                  />
                </svg>
              </div>
              <div className="request__content">
                <div className="letter space-y-6">
                  <div className="address text-base lg:text-xl space-y-4 border-b border-gray-300 pb-8">
                    <div className="from space-x-4">
                      <span className="text-gray-500">From : </span>
                      <span>{relief.email}</span>
                    </div>
                    <div className="to space-x-4">
                      <span className="text-gray-500">To : </span>
                      <span>DSWD</span>
                    </div>
                  </div>
                  <div className="body relative">
                    {relief.status === 'denied' && (
                        <div className="bg-red-200 border border-red-600 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600 min-w-[300px] min-h-[300px] shadow-md rounded-lg flex flex-col justify-center items-center text-base p-4">
                            <span>Request Denied</span>
                            <div className="reason text-xl my-12 text-center">
                                <span className="text-xs">Reason:</span>
                                <p>{relief.deny_reason}</p>
                            </div>
                            <div className="denied_by flex flex-col leading-tight text-center">
                                <span className="text-xs">Denied By:</span>
                                <span className="text-xl">{relief.denied_by}</span>
                            </div>
                        </div>
                    )}
                    <div className="title flex flex-col">
                      <span className="text-2xl lg:text-3xl capitalize font-bold mt-4">
                        {relief.title}
                      </span>
                    </div>
                    <div className="text-base lg:text-xl reason mt-8 min-h-[160px] max-h-[160px] lg:min-h-[350px] overflow-auto pr-4 cscrollbar whitespace-pre-line">
                      <p>{relief.reason}</p>
                    </div>
                  </div>
                  <div className="request space-y-4 text-base lg:text-xl">
                    <div className="households space-x-4 text-gray-500">
                      <span>
                        Households{" "}
                        <span className="text-base">&#40; Affected &#41; </span>{" "}
                        :
                      </span>
                      <span className="text-cblack">{relief.households}</span>
                    </div>
                    <div className="quantity space-x-4 text-gray-500">
                      <span>Quantity :</span>
                      <span className="text-cblack">{relief.households}</span>
                    </div>
                    <div className="quantity space-x-4 text-gray-500">
                      <span>Affected Areas :</span>
                      <span className="text-cblack text-base">
                        {relief.districts
                          .map((district) => district.name)
                          .join(", ")}
                      </span>
                    </div>
                    <div className="disaster-report space-x-4 text-gray-500 flex">
                      <span>Attachment :</span>
                      <a
                        href={`/storage/${relief.file_path}`}
                        target="_blank"
                        className="text-blue-500 flex space-x-1 items-center"
                      >
                        <span>Disaster Report</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="action border-t border-gray-300 pt-8 flex justify-between items-center">
                    <div className="id space-x-2 lg:space-x-4">
                      <span className="text-xs lg:text-base text-gray-500">
                        Request ID :
                      </span>
                      <span className="text-xs lg:text-base text-gray-500">
                        {relief.id}
                      </span>
                    </div>
                    <div className="action__btns space-x-2 lg:space-x-4 flex">
                        {relief.status === 'denied' ? (
                            <div className="denied border-2 border-red-500 rounded-lg px-4 py-2">
                                <div className="sec__1">
                                    <span className="text-2xl text-red-500">DENIED</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button
                                    className={`text-base lg:text-xl px-3 lg:px-4 py-3 ${
                                    relief.status === "in_transit"
                                        ? "bg-clgreen hover:bg-cgreen"
                                        : "bg-gray-300"
                                    } rounded-xl
                                    ${
                                        relief.status === "received"
                                        ? "hidden"
                                        : "block"
                                    }
                                    ctransition`}
                                    onClick={() =>
                                    handleConfirm(relief.id, relief.quantity)
                                    }
                                    disabled={relief.status != "in_transit"}
                                >
                                    Confirm Receipt
                                </button>
                                <button
                                    className={`text-base lg:text-xl px-3 lg:px-4 py-3 ${
                                    relief.status === "received"
                                        ? "bg-clgreen block"
                                        : "bg-gray-300 hidden"
                                    } rounded-xl hover:bg-cgreen ctransition`}
                                    onClick={() =>
                                    handleDistribute(relief.id)
                                    }
                                >
                                    Distribute
                                </button>
                            </>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QrScan
        reliefID={reliefID}
        reliefQuantity={reliefQuantity}
        setIsQrScanClicked={setIsQrScanClicked}
        isQrScanClicked={isQrScanClicked}
        shipmentID={shipmentID}
      />
    </>
  );
};

const QrScan = ({
  reliefID,
  reliefQuantity,
  setIsQrScanClicked,
  isQrScanClicked,
  shipmentID
}) => {
  const [scannedBoxes, setScannedBoxes] = useState([]);
  const { props } = usePage();

  useEffect(() => {
    let scanner;

    if (isQrScanClicked) {
      setTimeout(() => {
        const readerElement = document.getElementById("reader");
        if (readerElement) {
          scanner = new Html5QrcodeScanner("reader", {
            fps: 1,
            qrbox: {width: 200, height: 200},
            aspectRatio: 1.0
          });

          scanner.render(
            (decodedData) => {
            try {
                // Parse the JSON string into an object
                const parsedData = JSON.parse(decodedData);
                console.log("Parsed data:", parsedData);

                setScannedBoxes((prev) => {
                  // Check if we've already scanned this box
                  if (prev.includes(decodedData)) {
                    toast.error("Box Already Scanned");
                    return prev;
                  }

                  // Check if this box belongs to the correct relief request
                  if (parsedData.request_id !== reliefID) {
                    toast.error("Incorrect Relief ID");
                    return prev;
                  }

                  // Box is valid, add it to scanned boxes
                  toast.success(`Box ${parsedData.box_number} scanned successfully`);
                  return [...prev, decodedData];
                });
              } catch (error) {
                console.error("Error parsing QR code data:", error);
                toast.error("Invalid QR code format");
              }
            },
            (error) => console.warn("QR Scan Error: ", error)
          );
        }
      }, 300);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isQrScanClicked]);

  const { account, contract, provider, connectWallet } = useWallet();
  const handleConfirm = async () => {
    if (!account) {
        alert("Please connect your wallet first.");
        await connectWallet();
        return;
    }

    if (!contract) {
        alert("Contract is not initialized. Please connect your wallet.");
        return;
    }
    if (!provider) {
        alert("Provider is not initialized. Please connect your wallet.");
        return;
    }

    try{
        const signer = provider.getSigner();
        const tx = await contract.connect(signer).recordReceived(
        shipmentID,
        ethers.BigNumber.from(scannedBoxes.length.toString()));

        const receipt = await tx.wait(1);
    }
    catch(error){
        console.error("Detailed Error: ", error);
        if (error.data) {
            console.error("Error data:", error.data);
          }
          alert(`Error: ${error.message}`);
    }

    const user = props.auth.user;
    const receiver = `${user.first_name} ${user.last_name}`;

    axios.put(`/dswd/shipments/${shipmentID}/status`, {
        status: "received",
        req_id: reliefID,
        totalReceived: scannedBoxes.length,
        received_by: receiver
    })
    .then((res) => {
        if(res.data.warning){
            toast.warning(res.data.warning);
        }

        toast.success(res.data.success);
        sendMessage();
        setTimeout(() => {
            setIsQrScanClicked(false);
            window.location.reload();
        }, 5000);
    })
    .catch((error) => {
        toast.error(`Error: ${error.message}`);
    })
  }

  const sendMessage = () => {
    const reliefMessage = "Relief will be ready for distribution tomorrow.";
    axios
    .post("/notification/message", { message: reliefMessage })
    .then((res) => {
      console.log("Alert Sent:", res.data);
    })
    .catch((err) => {
      console.error("Error sending alert:", err);
    });
  }

  return (
    <AnimatePresence mode="wait">
      {isQrScanClicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.3, ease: [0, 0.55, 0.45, 1] },
          }}
          exit={{ opacity: 0 }}
          className="w-screen h-screen bg-cwhite fixed inset-0 p-6"
        >
          <div
            className="exit absolute top-4 right-4 bg-gray-500 rounded-full text-cwhite p-1"
            onClick={() => setIsQrScanClicked(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 lg:size-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
              />
            </svg>
          </div>
          <div className="w-[80vw] mx-auto flex flex-col items-center h-full">
          <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                    theme="colored"
                    className="text-sm"
                />
            <h1 className="text-4xl font-font1Smbd">Confirm Receipt</h1>
            <div className="wallet mb-8">
                <span className='text-sm text-gray-500'>Wallet: {account ? account : (<span className='underline text-blue-500 cursor-pointer' onClick={() => connectWallet()}>Connect Wallet</span>)}</span>
            </div>
            <div className="scanner">
                <div id="reader"></div>
            </div>
            <div className="confirm mt-8 flex flex-col items-center">
                <div className="scanned">Scanned Boxes: {scannedBoxes.length}</div>
                <button
                onClick={handleConfirm}
                className='bg-clgreen hover:bg-cgreen ctransition border border-cblack text-cblack px-6 py-2 rounded-xl mt-4'
                >Confirm</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
