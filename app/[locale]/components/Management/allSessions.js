"use client";
import { useState, useEffect } from "react";
import LoadingTwo from "../loadingTwo";
import { useTranslations } from "next-intl";
import { v4 } from "uuid";

//DB
import { db } from "../../config/firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AllSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionLocked, setSessionLocked] = useState([{ isLocked: false }]);
  const t = useTranslations("Index");
  const sessionsCollectionRef = collection(db, "sessions");
  const bespokeCollectionRef = collection(db, "bespokeSession");

  const getSessions = async () => {
    setLoading(true);
    try {
      const data = await getDocs(sessionsCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      await getlocked();
      setSessions(filteredData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Fetching Sessions", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getlocked = async () => {
    try {
      const data = await getDocs(bespokeCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setSessionLocked(filteredData);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const updeteLock = async (id, value) => {
    setLoading(true);
    const bespokeDoc = doc(db, "bespokeSession", id);
    try {
      await updateDoc(bespokeDoc, { isLocked: value });
      await getlocked();
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Error Updating", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <>
      {loading && <LoadingTwo />}
      <main className="w-full">
        <div className="w-full flex justify-center flex-wrap gap-12">
          <p className="text-sm font-bold text-PrimaryBlack/90">
            <i className="fa-solid fa-list text-PrimaryBlack/80"></i>&nbsp; All
            Sessions
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-PrimaryBlack/90">
              <i className="fa-solid fa-lock text-PrimaryBlack/80"></i>&nbsp;
              Lock Bespoke Session
            </p>
            <div
              onClick={() =>
                updeteLock(sessionLocked[0].id, !sessionLocked[0].isLocked)
              }
              className="w-10 h-5 rounded-full bg-PrimaryBlack/50 cursor-pointer p-0.5"
            >
              <div
                style={{
                  transform: `translateX(${
                    sessionLocked[0].isLocked === true ? "18" : "0"
                  }px)`,
                }}
                className="w-[50%] h-full rounded-full bg-white duration-200"
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col px-3 mt-3 py-3 gap-3">
          {sessions[0] &&
            sessions.map((session, index) => {
              console.log(session);
              return (
                <div
                  key={v4()}
                  className="border w-full h-auto  rounded max-[800px]:w-full flex flex-col gap-2"
                >
                  <p className="text-center px-5 py-4 border-b font-bold text-lg text-PrimaryBlack/90">
                    Section {index + 1}
                  </p>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      User's Name:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.name}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Meeting Type:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.meetingType}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Phone Number:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.phoneNumber}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Email:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.email}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Date Of Session:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.sessionDate}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Reference:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.reference}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Date Paid:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.date}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Total Amount:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.currency} {session.totalAmount}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      User's Address:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.address}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Described style in three words:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.describeStyleInThreeWords}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Design Type:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.designType}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      How user wants to feel in cinnamonPiece:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.howYouWantToFeelInCinnamonPiece}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Indication Of Budget:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.indicationOfBudget}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Date of user's event:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.dateOfTheEvent}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Event Location:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.eventLocation}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Event Location Details:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.eventLocationDetails}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Does User want express service?
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.selectedExpressService}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Shipping Information:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.shippingInformation}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Sizes selected:
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {session.sizes.map((size) => {
                        return (
                          <p
                            key={v4()}
                            className="text-PrimaryBlack/70 text-[13px] font-semibold"
                          >
                            {size}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Purpose of outfit:
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-2">
                      {session.purposeOfOutfit.map((size) => {
                        return (
                          <p
                            key={v4()}
                            className="text-PrimaryBlack/70 text-[13px] font-semibold"
                          >
                            {size}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Other Purpose:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.otherPurpose}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Proposed Outfit Pickup date:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.proposedOutfitPickupDate}
                    </p>
                  </div>
                  <div className="w-full flex gap-2 items-center px-5 border-b py-2">
                    <p className="font-bold text-sm text-PrimaryBlack/80">
                      Other Relevant Information:
                    </p>
                    <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                      {session.otherRelavantInformation}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}
