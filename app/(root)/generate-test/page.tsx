"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

export default function GenerateTestPage() {
  const [form, setForm] = useState({
    role: "",
    level: "",
    type: "technical",
    techstack: "",
    amount: 5,
    userid: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user?.id) {
          setForm((prev) => ({ ...prev, userid: user.id }));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "amount" ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userid) {
      alert("Please log in to generate an interview");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate interview");
      }

      router.push("/interview");
    } catch (error: any) {
      console.error("Submission failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate Interview</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="role"
          placeholder="Job Role"
          onChange={handleChange}
          value={form.role}
          required
        />
        <input
          name="level"
          placeholder="Experience Level"
          onChange={handleChange}
          value={form.level}
          required
        />
        <select name="type" onChange={handleChange} value={form.type}>
          <option value="technical">Technical</option>
          <option value="behavioural">Behavioural</option>
        </select>
        <input
          name="techstack"
          placeholder="Tech Stack (comma-separated)"
          onChange={handleChange}
          value={form.techstack}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Number of Questions"
          min={1}
          onChange={handleChange}
          value={form.amount}
          required
        />

        <Button type="submit" disabled={loading || !form.userid}>
          {loading ? "Generating..." : "Generate Interview"}
        </Button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </main>
  );
}
