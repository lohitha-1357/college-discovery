import { useState, useEffect } from "react";
import type { College } from "@/types";

type Status = "loading" | "error" | "success";

export function useColleges() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setColleges(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  return { colleges, status };
}