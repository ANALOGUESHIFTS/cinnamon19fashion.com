import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { auth } from "../config/firebase";
import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import LoadingTwo from "./loadingTwo";
import EditUserDetails from "./editUserDetails";
import IdiomProof from "./idiomProof";
import { db } from "../config/firebase";
import { v4 } from "uuid";
import { getDocs, collection, addDoc, doc } from "firebase/firestore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const containerRef = useRef();
  const { t, i18n } = useTranslation();
  const addressCollectionRef = collection(db, "addresses");
  const ordersCollectionRef = collection(db, "orders");

  const toggleMenu = () => {
    let elem = document.getElementById("menuBar");
    if (elem.style.left !== "0px") {
      elem.style.left = "0px";
    } else {
      elem.style.left = "-300px";
    }
  };

  const getAddresses = async () => {
    try {
      const data = await getDocs(addressCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setAddresses(filteredData.filter((data) => data.email === user.email));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Addresses");
    }
  };

  const getOrders = async () => {
    try {
      const data = await getDocs(ordersCollectionRef);
      const filteredData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setOrders(filteredData.filter((data) => data.email === user.email));
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Fetching Orders");
    }
  };

  useEffect(() => {
    if (!loading) {
      containerRef.current.scrollTop = 0;
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getOrders();
      getAddresses();
    }
  }, [user]);

  const updateUserDetails = async (data) => {
    setLoading(true);
    try {
      updateProfile(auth.currentUser, {
        displayName: data.name,
      }).then(() => {
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error Updating Details, Please Try again Later");
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      signOut(auth).then(() => {
        navigate("/");
      });
    } catch (err) {
      alert("Error Signing Out, Please Try Again");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingTwo />}
      {editModal && (
        <EditUserDetails
          cancel={() => setEditModal(false)}
          name={user ? user.displayName : ""}
          submit={(data) => {
            setEditModal(false);
            updateUserDetails(data);
          }}
        />
      )}
      {logoutModal && (
        <IdiomProof
          cancel={() => setLogoutModal(false)}
          submit={() => {
            setLogoutModal(false);
            logOut();
          }}
          question={"Are you sure you want to sign out of your account?"}
        />
      )}
      <main
        className="px-20 relative py-7 w-full flex justify-between bg-[#efeff1] max-[1000px]:px-12 max-[800px]:px-5"
        ref={containerRef}
      >
        <aside
          style={{ zIndex: `${loading || editModal ? 1 : "auto"}` }}
          id="menuBar"
          className="w-[280px] top-10 left-0 h-[500px] rounded-lg bg-white flex flex-col max-[800px]:fixed overflow-hidden max-[800px]:flex max-[800px]:top-0 sticky max-[800px]:h-screen max-[800px]:shadow-xl max-[800px]:rounded-none max-[800px]:left-[-300px] duration-500"
        >
          <Link
            to="/profile/"
            className="px-5 py-3 flex items-center gap-4 bg-[#d4d4d6] "
          >
            <i className="fa-regular fa-user text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("My Cinnamon Account")}
            </p>
          </Link>
          <Link
            to="/profile/address-book"
            className="px-5 py-3 flex items-center gap-4 bg-transparent hover:bg-black/10"
          >
            <i className="fa-solid fa-book-open text-PrimaryBlack text-xs"></i>
            <p className="text-PrimaryBlack font-semibold text-sm">
              {t("Address Book")}
            </p>
          </Link>
          <div
            onClick={() => setLogoutModal(true)}
            className="px-5 cursor-pointer py-3 flex items-center gap-4 bg-transparent w-full hover:bg-black/10"
          >
            <i className="fa-solid fa-right-from-bracket text-red-500 text-xs"></i>
            <p className="text-red-500 font-bold text-sm">{t("Log Out")}</p>
          </div>
        </aside>
        <section className="w-[calc(100%-300px)] h-auto bg-white rounded-lg max-[800px]:w-full max-[500px]:h-auto">
          <p className="text-PrimaryBlack/80 text-lg font-bold px-5 py-3 border-b text-center h-[50px] max-[800px]:text-left max-[800px]:flex max-[800px]:justify-between">
            {t("Account Overview")}
            <i
              onClick={toggleMenu}
              className="fa-solid fa-bars hidden max-[800px]:flex text-PrimaryBlack/80 max-[800px]:cursor-pointer"
            ></i>
          </p>
          <div className="w-full grid grid-cols-2 max-[500px]:flex max-[500px]:flex-col">
            <div className="col-span-1 border-r h-[300px] max-[500px]:w-full max-[500px]:h-[250px] max-[500px]:border-r-0 max-[500px]:border-b">
              <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {t("Account Details")}
                </p>
                <i
                  className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"
                  onClick={() => setEditModal(true)}
                ></i>
              </div>
              <div className="w-full px-5 py-3 flex flex-col gap-3">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {user.displayName}
                </p>
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="col-span-1 h-[300px] max-[500px]:w-full max-[500px]:h-[250px]">
              <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {t("Address Book")}
                </p>
                <Link to="/profile/address-book">
                  <i className="fa-solid fa-edit cursor-pointer text-PrimaryOrange"></i>
                </Link>
              </div>
              <div className="w-full flex flex-col px-5 py-5">
                {addresses[0] &&
                  addresses.map((address) => {
                    return (
                      <div
                        key={v4()}
                        className="border w-full h-auto p-4 rounded max-[800px]:w-full"
                      >
                        <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                          {address.firstName}&nbsp;
                          {address.lastName}
                        </p>
                        <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                          {address.deliveryAddress}
                        </p>
                        <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                          {address.additionalInfo}
                        </p>
                        <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                          {address.city}, &nbsp; {address.region}
                        </p>
                        <p className="text-xs font-bold text-PrimaryBlack/80 pb-1">
                          {address.phoneNumber} / &nbsp;
                          {address.additionalPhoneNumber}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-span-2 border-t h-auto w-full max-[500px]:border-r-0 max-[500px]:border-b">
              <div className="w-full px-5 h-[50px] flex justify-between items-center border-b">
                <p className="text-PrimaryBlack/80 text-base font-semibold">
                  {t("Orders")}
                </p>
              </div>
              <div className="w-full flex flex-col px-2 py-2 gap-3">
                {orders[0] &&
                  orders.map((order) => {
                    console.log(order);
                    return (
                      <div
                        key={v4()}
                        className="border-b w-full h-auto p-4 rounded max-[800px]:w-full flex flex-col gap-2"
                      >
                        <div className="w-full flex gap-2 items-center">
                          <p className="font-bold text-sm text-PrimaryBlack/80">
                            Date:
                          </p>
                          <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                            {order.date}
                          </p>
                        </div>
                        <div className="w-full flex gap-2 items-center">
                          <p className="font-bold text-sm text-PrimaryBlack/80">
                            Reference:
                          </p>
                          <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                            {order.reference}
                          </p>
                        </div>
                        <div className="w-full flex gap-2 items-center">
                          <p className="font-bold text-sm text-PrimaryBlack/80">
                            Total Amount:
                          </p>
                          <p className="text-PrimaryBlack/70 text-[13px] font-semibold">
                            {order.currency} {order.totalAmount}.00
                          </p>
                        </div>
                        <p className="font-bold text-sm pt-2 text-PrimaryBlack/80">
                          Product{order.products.length > 1 && "s"}
                        </p>
                        {order.products.map((product, index) => {
                          return (
                            <div
                              key={v4()}
                              className="border w-full h-auto p-4 rounded max-[800px]:w-full"
                            >
                              <p className="font-semibold text-sm text-PrimaryBlack py-2.5">
                                Product&nbsp;
                                {index + 1}
                              </p>
                              <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                                Name: {product.name}
                              </p>
                              <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                                Color: {product.color}
                              </p>
                              <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                                Size: {product.size}
                              </p>
                              <p className="text-[13px] font-bold text-PrimaryBlack/80 pb-1">
                                Quantity: {product.quantity}
                              </p>
                              <Link
                                to={`/product-details/${product.productId}`}
                              >
                                <p className="text-[13px] font-semibold hover:underline text-blue-600 pb-1">
                                  View Product
                                </p>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
