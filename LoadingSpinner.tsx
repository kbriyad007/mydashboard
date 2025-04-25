// LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 1 10 10H2A10 10 0 0 1 12 2z"
          className="opacity-25"
        />
      </svg>
    </div>
  );
}
