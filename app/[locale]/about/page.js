import AboutPageDetails from "../components/About/PageDetails";

export const metadata = {
  title: "About | Cinnamon19Fashion",
  description:
    "Welcome to Cinnamon19Fashion—your go-to destination for cutting-edge fashion. At our virtual fashion hub, we curate a diverse collection to inspire your style journey. We believe in more than just transactions; we're a community celebrating individuality and self-expression. Our commitment to quality, authenticity, and customer satisfaction sets us apart. Join us in redefining fashion—because every outfit tells a unique story. Welcome to the Cinnamon19Fashion family!",
  openGraph: {
    title: "About | Cinnamon19Fashion",
    description:
      "Welcome to Cinnamon19Fashion—your go-to destination for cutting-edge fashion. At our virtual fashion hub, we curate a diverse collection to inspire your style journey. We believe in more than just transactions; we're a community celebrating individuality and self-expression. Our commitment to quality, authenticity, and customer satisfaction sets us apart. Join us in redefining fashion—because every outfit tells a unique story. Welcome to the Cinnamon19Fashion family!",
    url: "https://cinnamon19fashion.com/en/about",
    siteName: "Cinnamon19Fashion",
    images: [
      {
        url: "/images/ceo.jpg",
        width: 600,
        height: 800,
      },
    ],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en/about",
    },
  },
};

export default function Page() {
  return <AboutPageDetails />;
}
