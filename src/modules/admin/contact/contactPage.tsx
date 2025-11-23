"use client";
import { useEffect, useState } from "react";
import AdminGuard from "../../../components/adminGuard";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([])

  
  // Load Feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("/api/feedback");
        if (!res.ok) return;
        const data = await res.json();
        
        setFeedbacks(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };
    fetchFeedback();
  }, []);
  
  return (
    <AdminGuard>
      <div className="container py-4 admin-feedback">
        <h2 className="mb-4">Client Feedback</h2>

        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminGuard>
  );
}