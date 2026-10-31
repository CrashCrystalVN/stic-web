"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <button
            onClick={() => reset()}
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
