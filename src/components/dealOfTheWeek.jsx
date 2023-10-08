import { useState, useEffect } from "react";

export default function DealOfTheWeek() {
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 24 * 60 * 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsRemaining((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const daysRemaining = Math.floor(secondsRemaining / 86400); // 1 day = 86400 seconds
  const hoursRemaining = Math.floor((secondsRemaining % 86400) / 3600);
  const minutesRemaining = Math.floor(((secondsRemaining % 86400) % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="w-full px-12 py-14 ">
      <div
        style={{ backgroundImage: "url(/src/assets/images/time-bg.jpg.webp)" }}
        className="h-[550px] bg-cover bg-center w-full flex flex-col justify-center pl-32"
      >
        <div className="w-[420px] flex flex-col justify-center items-center">
          <p
            id="dealOfTheWeekTitle"
            className="text-PrimaryBlack/90 text-4xl font-bold relative w-fit pb-11"
          >
            Deal Of The Week
          </p>
          <p className="text-center text-PrimaryBlack/70 text-base pb-5 font-medium">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            ipsum dolor sit amet, consectetur adipisicing elit
          </p>
          <div className="flex items-end pb-6">
            <p className="font-bold text-PrimaryOrange text-2xl">$35.00</p>
            <p className="text-PrimaryBlack/80 text-base font-medium pb-1">
              &nbsp;/ HanBag
            </p>
          </div>
          <div className="w-full flex justify-between pb-6">
            <div className="bg-white h-[90px] w-[75px] rounded-md flex justify-center flex-col items-center">
              <p className="font-bold text-PrimaryOrange text-3xl">
                {daysRemaining}
              </p>
              <p
                style={{ letterSpacing: "2px" }}
                className="text-PrimaryBlack/50 font-semibold text-base"
              >
                DAYS
              </p>
            </div>
            <div className="bg-white h-[90px] w-[75px] rounded-md flex justify-center flex-col items-center">
              <p className="font-bold text-PrimaryOrange text-3xl">
                {hoursRemaining}
              </p>
              <p
                style={{ letterSpacing: "2px" }}
                className="text-PrimaryBlack/50 font-semibold text-base"
              >
                HRS
              </p>
            </div>
            <div className="bg-white h-[90px] w-[75px] rounded-md flex justify-center flex-col items-center">
              <p className="font-bold text-PrimaryOrange text-3xl">
                {minutesRemaining}
              </p>
              <p
                style={{ letterSpacing: "2px" }}
                className="text-PrimaryBlack/50 font-semibold text-base"
              >
                MINS
              </p>
            </div>
            <div className="bg-white h-[90px] w-[75px] rounded-md flex justify-center flex-col items-center">
              <p className="font-bold text-PrimaryOrange text-3xl">{seconds}</p>
              <p
                style={{ letterSpacing: "2px" }}
                className="text-PrimaryBlack/50 font-semibold text-base"
              >
                SECS
              </p>
            </div>
          </div>
          <div className="flex justify-center pt-5">
            <button className="text-white bg-PrimaryOrange py-2 px-5 w-38">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
