"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TestAuthPage() {
  const { user, loading, refetch } = useAuth();

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

      {user ? (
        <div className="space-y-4">
          <p className="text-green-600">✅ You are logged in!</p>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold">User Info:</h3>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Name:</strong> {user.name || "Not provided"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-red-600">❌ You are not logged in</p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      )}

      <div className="mt-8">
        <Button onClick={refetch} variant="outline">
          Refresh Auth State
        </Button>
      </div>
    </div>
  );
}
