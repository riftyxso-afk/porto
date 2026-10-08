import React from "react";

export function TechIcon({ name }: { name: string }) {
  const className = "w-3.5 h-3.5 shrink-0";

  switch (name) {
    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M6 17.5c.5.8 1.4 1.3 2.5 1.3 1.5 0 2.5-.8 2.5-2.6V9h-2.1v7.2c0 .8-.4 1.2-1.1 1.2-.5 0-.9-.3-1.1-.7l-.8.8zm8.7-.3c.7.4 1.5.7 2.4.7 1.3 0 2.1-.6 2.1-1.6 0-1-.8-1.4-2.2-2-1.8-.7-2.9-1.6-2.9-3.2 0-1.8 1.4-3.1 3.5-3.1 1.1 0 2 .3 2.7.7l-.6 1.7c-.5-.3-1.2-.6-2.1-.6-1 0-1.6.5-1.6 1.3 0 .9.7 1.3 2 1.8 2 .8 3.1 1.7 3.1 3.4 0 2-1.5 3.3-4 3.3-1.2 0-2.3-.4-3-.9l.6-1.5z"
            fill="#000000"
          />
        </svg>
      );

    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path
            d="M5 10.5h6v1.8H8.8V19H7.2v-6.7H5v-1.8zm8.7 6.7c.7.4 1.5.7 2.4.7 1.3 0 2.1-.6 2.1-1.6 0-1-.8-1.4-2.2-2-1.8-.7-2.9-1.6-2.9-3.2 0-1.8 1.4-3.1 3.5-3.1 1.1 0 2 .3 2.7.7l-.6 1.7c-.5-.3-1.2-.6-2.1-.6-1 0-1.6.5-1.6 1.3 0 .9.7 1.3 2 1.8 2 .8 3.1 1.7 3.1 3.4 0 2-1.5 3.3-4 3.3-1.2 0-2.3-.4-3-.9l.6-1.5z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M11.9 2c-3.1 0-5.2.4-5.2 2.6v2.1h5.3v.8H4.6C2.5 7.5 2 9.5 2 12.6c0 2.8.7 4.7 2.6 4.7h1.6v-2.3c0-2.3 2-4.2 4.3-4.2h5.3v-.8H8.5c-.7 0-1.2-.5-1.2-1.2V6.5c0-.7.5-1.2 1.2-1.2h3.4c2.8 0 4.7-.6 4.7-3.3C16.6 2 14.8 2 11.9 2zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm1.9 7.9c-2.3 0-4.3 1.9-4.3 4.2v2.3h7.3c2.1 0 2.6-2 2.6-5.1 0-2.8-.7-4.7-2.6-4.7h-1.6v2.3c0 2.3-2 4.2-4.3 4.2H5.6v.8h7.3c.7 0 1.2.5 1.2 1.2v2.3c0 .7-.5 1.2-1.2 1.2H9.5c-2.8 0-4.7.6-4.7 3.3 0 0 1.8 0 4.7 0 3.1 0 5.2-.4 5.2-2.6v-2.1H9.4v-.8h7.4z" />
        </svg>
      );

    case "C++":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#00599C" />
          <path
            d="M10.8 14.8c-.8.8-1.9 1.2-3.1 1.2-2.3 0-4.1-1.7-4.1-4s1.8-4 4.1-4c1.2 0 2.3.5 3.1 1.2l-1.3 1.4c-.5-.5-1.1-.8-1.8-.8-1.2 0-2.2.9-2.2 2.2s1 2.2 2.2 2.2c.7 0 1.3-.3 1.8-.8l1.3 1.4zm3.7-3.5h1.2v1.4h-1.2v1.2h-1.4v-1.2h-1.2v-1.4h1.2V10h1.4v1.3zm5 0h1.2v1.4h-1.2v1.2h-1.4v-1.2h-1.2v-1.4h1.2V10h1.4v1.3z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case "React":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            stroke="#00D8FF"
            strokeWidth="1.5"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            stroke="#00D8FF"
            strokeWidth="1.5"
            transform="rotate(120 12 12)"
          />
          <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
        </svg>
      );

    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path
            d="M14.8 16.5l-6-7.8h-1.6v6.6h1.5V11l5.5 7.1c.2-.2.4-.4.6-.6z"
            fill="#FFFFFF"
          />
          <path d="M14.8 8.7h1.5v6.6h-1.5z" fill="#FFFFFF" />
        </svg>
      );

    case "Expo":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12 4l9 16H3l9-16zm0 4.5L6.5 17h11L12 8.5z" />
        </svg>
      );

    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-.9 3-.3.6.3 1 1 1.5 1.7 1 1.2 2 2.5 4.5 2.5 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 .9-3 .3-.6-.3-1-1-1.5-1.7C15.5 7.3 14.5 6 12 6zm-7.5 7.5c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-.9 3-.3.6.3 1 1 1.5 1.7 1 1.2 2 2.5 4.5 2.5 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 .9-3 .3-.6-.3-1-1-1.5-1.7-1-1.2-2-2.5-4.5-2.5z" />
        </svg>
      );

    case "HTML":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#E34F26">
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.8 5.6h-8.2l.2 2.2h7.8l-.6 6.7-4.2 1.2-4.2-1.2-.3-3.4H10l.2 1.8 1.8.5 1.8-.5.2-2.4H6.2L5.6 5.2h12.5l-.3 2.4z" />
        </svg>
      );

    case "CSS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#1572B6">
          <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.8 5.6h-8.2l.2 2.2h7.8l-.6 6.7-4.2 1.2-4.2-1.2-.3-3.4H10l.2 1.8 1.8.5 1.8-.5.2-2.4H6.2L5.6 5.2h12.5l-.3 2.4z" />
        </svg>
      );

    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#5FA04E">
          <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
        </svg>
      );

    case "Express.js":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="4" fill="#000000" />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12"
            fontWeight="bold"
            fontFamily="system-ui"
          >
            ex
          </text>
        </svg>
      );

    case "FastAPI":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#05998B">
          <circle cx="12" cy="12" r="10" />
          <path d="M13 5l-5 8h4l-1 6 6-9h-4l1-5z" fill="#FFFFFF" />
        </svg>
      );

    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#4169E1">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3.4.1.8-.1.8-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2-.2-4.1-1-4.1-4.5 0-1 .4-1.8 1-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.6 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.8-1.3 2.6-1 2.6-1 .5 1.2.2 2.2.1 2.4.6.6 1 1.4 1 2.4 0 3.5-2.1 4.3-4.1 4.5.3.3.6.8.6 1.7V21c0 .4.4.6.8.5C19.4 19.8 22 16.2 22 12c0-5.5-4.5-10-10-10z" />
        </svg>
      );

    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#47A248">
          <path d="M12 2C11.5 2 7 8 7 13.5c0 3.6 2.2 6.5 5 6.5s5-2.9 5-6.5C17 8 12.5 2 12 2zm0 18v-8.5c0-1.5.5-3 1.5-4 1.5 2 2.5 4.5 2.5 6 0 2.8-1.8 5-4 5z" />
        </svg>
      );

    case "Redis":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#DC382D">
          <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3zm0 6l9 4.5-9 4.5-9-4.5L12 9zm0 6l9 4.5-9 4.5-9-4.5L12 15z" />
        </svg>
      );

    case "BullMQ":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M4 6c0 3 2 5 4 5s3-1 3-3V6H4zm16 0c0 3-2 5-4 5s-3-1-3-3V6h7zm-8 4c-3.3 0-6 2.7-6 6v3h12v-3c0-3.3-2.7-6-6-6z" />
        </svg>
      );

    case "Prisma":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12.5 2.5l9 17.5a1 1 0 01-1.3 1.3L3.5 14a1 1 0 01-.1-1.7l8-9.5a1 1 0 011.1-.3zm-1.2 3.2L5 13.2l12.4 5.5-6.1-13z" />
        </svg>
      );

    case "PySpark":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#E25A1C">
          <path d="M12 2l2.4 6.8L21 10.5l-5.6 4.3 1.8 6.9-5.2-4.1-5.2 4.1 1.8-6.9L3 10.5l6.6-1.7L12 2z" />
        </svg>
      );

    case "dbt":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF694B">
          <path d="M4 4l8 8-8 8V4zm16 0l-8 8 8 8V4zm-8 4l4 4-4 4-4-4 4-4z" />
        </svg>
      );

    case "Databricks":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF3621">
          <path d="M12 3l8 4.6-8 4.6-8-4.6L12 3zm0 6.2l8 4.6-8 4.6-8-4.6 8-4.6zm0 6.2l8 4.6-8 4.6-8-4.6 8-4.6z" />
        </svg>
      );

    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF9900">
          <path d="M4 14c4 3 12 3 16 0-3 2-9 3-13 1l-3-1zm14 1c1.5 0 2-1 2-1s-.5.3-1.5.3c-.6 0-1.2-.1-1.8-.3.4.6.9 1 1.3 1zm-8-9c-1.3 0-2.3.8-2.3 2.2 0 1.5 1 2.3 2.3 2.3s2.3-.8 2.3-2.3c0-1.4-1-2.2-2.3-2.2z" />
        </svg>
      );

    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
          <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm9 8c-.6 0-1.1.2-1.5.5-.8-.5-1.9-.8-3.1-.7-1.7.1-3.2.9-4 2.2H3c-.6 0-1 .4-1 1 0 4 3.5 7 8 7 5.5 0 10-3.5 10-9 0-.4-.4-.8-.8-.9-.4-.1-.8-.1-1.2-.1z" />
        </svg>
      );

    case "Git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F05032">
          <path d="M21.7 10.7l-8.4-8.4c-.9-.9-2.5-.9-3.4 0L8.2 4l2.2 2.2c.7-.2 1.5 0 2 .5.6.6.7 1.4.5 2.1l2.1 2.1c.7-.2 1.5 0 2.1.5.8.8.8 2.2 0 3-.8.8-2.2.8-3 0-.6-.6-.7-1.4-.5-2.1l-2-2v4.8c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2s-2-.9-2-2c0-.6.3-1.1.7-1.4v-4.9c-.4-.3-.7-.8-.7-1.4 0-.6.3-1.1.6-1.4L2.3 9.3c-.9.9-.9 2.5 0 3.4l8.4 8.4c.9.9 2.5.9 3.4 0l7.6-7.6c1-.9 1-2.4 0-3.4z" />
        </svg>
      );

    case "LangChain":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M7 7h10v2H7V7zm2 4h6v2H9v-2zm-2 4h10v2H7v-2zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1z" />
        </svg>
      );

    case "RAG":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    case "Vector Databases":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v5c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
          <path d="M4 13v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5" />
        </svg>
      );

    default:
      return (
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
      );
  }
}
