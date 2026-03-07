/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
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
  updateApplicant: (id: string, data?: any) => Promise<void>;
  deleteApplicant: (id: string) => Promise<void>;
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

  updateApplicant: async () => {},
  deleteApplicant: async () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState<any[]>([]);

  const router = useRouter();

  // --- Login helper inside provider ---
  // GlobalProvider.tsx
  const login = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        values,
        { withCredentials: true },
      );

      // ⚡ Set user instantly
      setUser(res.data.user);

      message.success({
        content: res.data.message || "Logged in successfully!",
        icon: (
          <FontAwesomeIcon
            style={{ color: "var(--primary-color)" }}
            icon={faCheckCircle}
          />
        ),
      });

      // redirect based on role
      router.push(
        res.data.user.role === "admin" ? "/admin/dashboard" : "/user/dashboard",
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
    } catch {
      message.error("Failed to fetch tickets");
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
    } catch {
      setUser(null);
      router.replace("/"); // redirect if not logged in
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
        fetchTickets,

        updateTicket,
        deleteTicket,

        createApplicant,
        updateApplicant,
        deleteApplicant,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
