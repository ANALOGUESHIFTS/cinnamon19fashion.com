import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import Latest1 from "@/public/images/latest-1.jpg";
import Latest2 from "@/public/images/latest-2.jpg";
import Lastest3 from "@/public/images/latest-3.jpg";
import Icon1 from "@/public/images/icon-1.png";
import Icon2 from "@/public/images/icon-2.png";

export default function BlogSection() {
  const { t, i18n } = useTranslation();
  const blogs = [
    {
      image: Latest1,
      date: "May 4,2023",
      comments: "5",
      title: t("Cinnamon In The Look By Marie Claire"),
      details: t("Cinnamon In The Look By Marie Claire"),
    },
    {
      image: Latest2,
      date: "May 4,2023",
      comments: "5",
      title: t("Revolutionising Nigeria's Fashion E-commerce by thisday style"),
      details: t(
        "Revolutionising Nigeria's Fashion E-commerce by thisday style"
      ),
    },
    {
      image: Lastest3,
      date: "May 4,2023",
      comments: "5",
      title: t("Outfit of the day: Sister of the groom!"),
      details: t("Outfit of the day: Sister of the groom!"),
    },
  ];
  const perks = [
    {
      icon: Icon1,
      title: t("FREE SHIPPING"),
      description: t("When you buy from the website"),
    },
    {
      icon: Icon2,
      title: t("DELIVERY ON TIME"),
      description: t("We offer fast delivery"),
    },
    {
      icon: Icon1,
      title: t("SECURE PAYMENT"),
      description: t("100% secure payment"),
    },
  ];
  return (
    <div className="px-28 py-14 max-[1000px]:px-12 max-[800px]:px-5">
      <div className="w-full flex pb-8 justify-center">
        <p
          id="dealOfTheWeekTitle"
          className="text-PrimaryBlack text-3xl font-bold relative w-fit pb-11"
        >
          {t("From The Blog")}
        </p>
      </div>
      <div className="flex w-full justify-between max-[900px]:flex-col max-[900px]:gap-4">
        {blogs.map((data) => {
          return (
            <div
              key={data.title}
              className="w-[31.5%] h-auto flex flex-col max-[900px]:w-full"
            >
              <Image
                className="object-cover w-full h-60"
                src={data.image}
                alt="Blog Image"
              />
              <div className="pt-6 flex gap-5 items-center">
                <div className="flex items-center gap-1">
                  <i class="fa-regular fa-calendar text-PrimaryOrange"></i>
                  <p className="text-PrimaryBlack/60 text-[15px] font-medium">
                    {data.date}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <i class="fa-regular fa-comment text-PrimaryOrange"></i>
                  <p className="text-PrimaryBlack/60 text-[15px] font-medium">
                    {data.comments}
                  </p>
                </div>
              </div>
              <Link href="/blog">
                <p className="pt-3 text-PrimaryBlack text-[22px] font-bold w-[80%]">
                  {data.title}
                </p>
              </Link>
              <p className="pt-3 text-PrimaryBlack/80 text-base font-medium tracking-normal">
                {data.details}
              </p>
            </div>
          );
        })}
      </div>
      <div className="pt-14 w-full">
        <div className="w-full border-y border-l grid grid-cols-3 h-28 max-[900px]:border max-[900px]:flex max-[900px]:flex-col max-[900px]:h-auto max-[900px]:py-5 max-[900px]:gap-8">
          {perks.map((data) => {
            return (
              <div
                className="col-span-1 h-full flex justify-center items-center gap-4 border-r max-[900px]:w-full max-[900px]:border-r-none max-[900px]:justify-start max-[900px]:px-[15%]"
                key={data.title}
              >
                <Image src={data.icon} alt="Icon" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[17px] font-bold text-PrimaryBlack">
                    {data.title}
                  </p>
                  <p className="text-base text-PrimaryBlack font-medium">
                    {data.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
