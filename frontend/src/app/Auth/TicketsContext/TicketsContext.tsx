/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/context/TicketsContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

interface TicketsContextProps {
  tickets: any[];
  setTickets: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}

const TicketsContext = createContext<TicketsContextProps>({
  tickets: [],
  setTickets: () => {},
  loading: false,
});

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/dealtickets`,
          { withCredentials: true },
        );
        setTickets(res.data.tickets || []);
      } catch (err) {
        message.error("Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <TicketsContext.Provider value={{ tickets, setTickets, loading }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => useContext(TicketsContext);
