export default function NotFound() {
  return (
    <main className="pt-[102px] lg:pt-[72px] flex items-center justify-center grow">
      <div>
        {/* Not found Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-24 h-24 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
        <h2 className="">404 Page Not Found</h2>
      </div>
    </main>
  );
}
