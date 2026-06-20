/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "@/app/components/types/user/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleCheck,
  faCircleXmark,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { App } from "antd";

interface GlobalContextProps {
  user: IUser | null;
  tickets: any[];
  applicants: any[];
  loading: boolean;
  login: (values: { email: string; password: string }) => Promise<void>; // 🔥 add this
  logout: () => Promise<void>;
  fetchTickets: () => Promise<void>;
  updateTicket: (id: string, data: any) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  createApplicant: (data: any) => Promise<void>;
  getSingleApplicant: (id: string) => Promise<any | null>;
  updateApplicant: (id: string, data?: any) => Promise<void>;
  deleteApplicant: (id: string) => Promise<void>;
  startApplication: (id: string) => Promise<void>;
  progressApplication: (token: string, data: any) => Promise<void>;

  addInvestment: (applicantId: string, data: any) => Promise<void>;

  transactions: any[];
  totalInvestedCombined: object;

  myTransactions: any[];
  myPortfolio: any;

  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextProps>({
  user: null,
  tickets: [],
  applicants: [],
  loading: true,
  logout: async () => {},
  login: async () => {}, // 🔥 add this
  fetchTickets: async () => {},

  updateTicket: async () => {},
  deleteTicket: async () => {},

  createApplicant: async () => {},
  getSingleApplicant: async () => {},
  updateApplicant: async () => {},
  deleteApplicant: async () => {},

  startApplication: async () => {},
  progressApplication: async () => {},

  addInvestment: async () => {},

  transactions: [],
  totalInvestedCombined: {},
  myTransactions: [],
  myPortfolio: null,

  changePassword: async () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalInvestedCombined, setTotalInvestedCombined] = useState<object>(
    {},
  );
  const [myTransactions, setMyTransactions] = useState<any[]>([]);
  const [myPortfolio, setMyPortfolio] = useState<any>(null);

  const { message } = App.useApp();

  const router = useRouter();

  // --- Login helper inside provider ---

  const login = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        values,
        { withCredentials: true },
      );

      const loggedUser = res.data.user;

      // ✅ set user
      setUser(loggedUser);

      // ✅ fetch fresh applicants and USE returned data
      const [_, applicantsData] = await Promise.all([
        fetchTickets(),
        getAllApplicants(),
        getMyPortfolio(),
        getMyTransactions(),
      ]);

      // ✅ find from fresh data (NOT state)
      const found = applicantsData.find(
        (a: any) => a.email === loggedUser.email,
      );

      // ✅ start application instantly
      if (found?.status === "Sent") {
        const updatedApplicant = await startApplication(found.email);

        // 🔥 IMPORTANT: ensure state sync (extra safety)
        setApplicants((prev) =>
          prev.map((a) =>
            a.email === updatedApplicant.email ? updatedApplicant : a,
          ),
        );
      }

      message.success({
        content: res.data.message || "Logged in successfully!",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faCheckCircle}
          />
        ),
      });

      router.push(
        loggedUser.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
      );
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Not authorized❌",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
      throw err;
    }
  };

  // const login = async (values: { email: string; password: string }) => {
  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
  //       values,
  //       { withCredentials: true },
  //     );

  //     // ⚡ Set user instantly
  //     setUser(res.data.user);

  //     // 🔹 Fetch tickets and applicants instantly
  //     await Promise.all([fetchTickets(), getAllApplicants()]);

  //     message.success({
  //       content: res.data.message || "Logged in successfully!",
  //       icon: (
  //         <FontAwesomeIcon
  //           style={{ color: "var(--primary-color)" }}
  //           icon={faCheckCircle}
  //         />
  //       ),
  //     });

  //     // redirect based on role
  //     router.push(
  //       res.data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
  //     );
  //   } catch (err: any) {
  //     message.error({
  //       content: err.response?.data?.message || "Not authorized❌",
  //       icon: (
  //         <FontAwesomeIcon
  //           style={{ color: "rgb(231, 76, 60)" }}
  //           icon={faCircleXmark}
  //         />
  //       ),
  //     });
  //     throw err;
  //   }
  // };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);

      message.success({
        content: res.data.message || "Logged out successfully ✅",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faRightFromBracket}
          />
        ),
      });

      router.replace("/"); // redirect after logout
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Logout failed",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
    }
  };

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
        data,
        { withCredentials: true },
      );

      // message.success({
      //   content: res.data.message || "Password updated successfully ✅",
      // });

      message.success({
        content: res.data.message || "Password updated successfully ✅",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faRightFromBracket}
          />
        ),
      });

      // 🔥 force logout
      setUser(null);
      router.replace("/"); // redirect to login
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Failed to update password",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });

      throw err;
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
        { withCredentials: true },
      );
      setTickets(res.data.tickets || []);
    } catch {
      message.error("Failed to fetch tickets");
    }
  };

  const updateTicket = async (id: string, data: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets/${id}`,
        data,
        { withCredentials: true },
      );

      // Update local state instantly (no reload)
      setTickets((prev) =>
        prev.map((ticket) => (ticket._id === id ? res.data.ticket : ticket)),
      );

      // message.success(res.data.message || "Ticket updated successfully ✅");

      message.success({
        content: res.data.message || "Ticket updated successfully✅",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faCircleCheck}
          />
        ),
      });
    } catch (err: any) {
      // message.error(
      //   err.response?.data?.message || "Failed to update ticket ❌",
      // );
      message.error({
        content: err.response?.data?.message || "Failed to update ticket",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
    }
  };

  const deleteTicket = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets/${id}`,
        { withCredentials: true },
      );

      // Remove from local state instantly
      setTickets((prev) => prev.filter((ticket) => ticket._id !== id));

      // message.success(res.data.message || "Ticket deleted successfully 🗑");

      message.success({
        content: res.data.message || "Ticket deleted successfully🗑",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faTrash}
          />
        ),
      });
    } catch (err: any) {
      // message.error(
      //   err.response?.data?.message || "Failed to delete ticket ❌",
      // );
      message.error({
        content: err.response?.data?.message || "Failed to delete ticket!",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
    }
  };

  // Applicant API

  const createApplicant = async (data: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants`,
        data,
        { withCredentials: true },
      );

      // ✅ Add the newly created applicant to the global state instantly
      setApplicants((prev) => [...prev, res.data.applicant.applicant]);

      // console.log("DAta", res.data.applicant.applicant);

      message.success({
        content: res.data.message || "Applicant created successfully ✅",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faCircleCheck}
          />
        ),
      });

      return res.data.applicant;
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Failed to create applicant",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
      throw err;
    }
  };

  const getAllApplicants = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants`,
        { withCredentials: true },
      );

      setApplicants(res.data.applicants || []);

      return res.data.applicants; // ✅ return data
    } catch {
      message.error("Failed to fetch applicants");
      return [];
    }
  };

  const getSingleApplicant = async (id: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${id}`,
        { withCredentials: true },
      );

      const applicant = res.data.applicant;

      // update state (keep your existing logic)
      // setApplicants((prev) =>
      //   prev.map((a) => (a._id === id ? applicant : a)),
      // );

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === res.data.data?._id
            ? { ...applicant, ...res.data.data } // ✅ merge, don't replace
            : applicant,
        ),
      );

      return applicant; // ✅ IMPORTANT
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Failed to fetch applicant!",
      });

      return null; // ✅ to avoid undefined
    }
  };

  const updateApplicant = async (id: string, data: any = {}) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${id}`,
        data,
        { withCredentials: true },
      );
      // console.log("Applicant Id:", id);

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id ? res.data.applicant : applicant,
        ),
      );

      message.success({
        content: res.data.message || "Applicant updated successfully!",
      });
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Failed to update applicant!",
      });
    }
  };

  const deleteApplicant = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${id}`,
        { withCredentials: true },
      );

      // Remove from local state instantly
      setApplicants((prev) => prev.filter((applicant) => applicant._id !== id));

      // message.success(res.data.message || "Ticket deleted successfully 🗑");

      message.success({
        content: res.data.message || "Applicant deleted successfully🗑",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faTrash}
          />
        ),
      });
    } catch (err: any) {
      // message.error(
      //   err.response?.data?.message || "Failed to delete ticket ❌",
      // );
      message.error({
        content: err.response?.data?.message || "Failed to delete applicant!",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
    }
  };

  // Start Application

  const startApplication = async (email: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/start`,
        { email },
        { withCredentials: true },
      );

      const updatedApplicant = res.data.applicant;

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant.email === email ? updatedApplicant : applicant,
        ),
      );

      // message.success(res.data.message || "Application started!");

      return updatedApplicant;
    } catch (err: any) {
      message.error(
        err.response?.data?.message || "Failed to start application",
      );
    }
  };

  // Progress Application

  const progressApplication = async (token: string, data: any) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/start/${token}`,
        data,
        { withCredentials: true },
      );

      // ✅ Update state instantly
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === res.data.data._id ? res.data.data : applicant,
        ),
      );

      message.success(
        res.data.message || "Application submitted successfully!",
      );

      return res.data.data;
    } catch (err: any) {
      message.error(
        err.response?.data?.message || "Failed to submit application",
      );
      throw err;
    }
  };

  // Add Investment
  const addInvestment = async (applicantId: string, data: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/${applicantId}/investment`,
        data,
        { withCredentials: true },
      );

      // Update applicant instantly
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicantId ? res.data.data : applicant,
        ),
      );

      message.success({
        content: res.data.message || "Bond created successfully!",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faCircleCheck}
          />
        ),
      });
    } catch (err: any) {
      message.error({
        content: err.response?.data?.message || "Failed to add bond",
        icon: (
          <FontAwesomeIcon
            style={{ color: "rgb(231, 76, 60)" }}
            icon={faCircleXmark}
          />
        ),
      });
    }
  };

  // Fetch all transactions
  const getAllTransactions = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/transactions`,
        { withCredentials: true },
      );

      setTransactions(res.data.data || []);
    } catch {
      message.error("Failed to fetch transactions!");
    }
  };

  const getTotalInvestment = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/total-investment`,
        { withCredentials: true },
      );

      setTotalInvestedCombined(res.data.data || {});
    } catch {
      message.error("Failed to fetch total investment amount!");
    }
  };

  // Fetch single user investment
  const getMyPortfolio = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/my-portfolio`,
      { withCredentials: true },
    );

    setMyPortfolio(res.data.data);

    return res.data.data;
  };

  const getMyTransactions = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/applicants/my-transactions`,
      { withCredentials: true },
    );

    setMyTransactions(res.data.data);

    return res.data.data;
  };

  const initialize = async () => {
    setLoading(true);
    try {
      // Auth check
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
        {
          withCredentials: true,
        },
      );
      setUser(res.data.user);

      // Fetch tickets
      fetchTickets();
      // const ticketRes = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
      //   {
      //     withCredentials: true,
      //   },
      // );
      // setTickets(ticketRes.data.tickets || []);

      // Fetch applicants
      getAllApplicants();
      getAllTransactions();
      getTotalInvestment();
      getMyPortfolio();
      getMyTransactions();
    } catch {
      setUser(null);
      // router.replace("/"); // redirect if not logged in
    } finally {
      setLoading(false);
    }
  };

  // inside GlobalProvider
  useEffect(() => {
    initialize(); // run client-side after mount
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        tickets,
        applicants,
        loading,
        logout,
        login, // 🔥 add here
        changePassword,

        fetchTickets,
        updateTicket,
        deleteTicket,

        createApplicant,
        getSingleApplicant,
        updateApplicant,
        deleteApplicant,

        startApplication,
        progressApplication,

        addInvestment,

        transactions,
        totalInvestedCombined,

        myTransactions,
        myPortfolio,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
