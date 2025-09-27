"use client";
import { useAuth } from "../context/AuthContext";
import FormLogin from "../components/FormLogin";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <FormLogin />
    </div>
  );
}
