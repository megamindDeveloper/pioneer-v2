// src/components/CommonComponents/HomeButton/page.tsx

"use client";

import Link from "next/link";
import React from "react";

const HomeButton = () => {
  return (
    <Link
      href="/"
      aria-label="Go to Homepage"
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 1000, // Ensures it's on top of other content
     
        backdropFilter: "blur(8px)", // Frosted glass effect
        borderRadius: "50%",
        padding: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s ease",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      // Simple hover effect
      onMouseOver={(e) => (e.currentTarget.style.background = "rgba(50, 50, 50, 0.9)")}
      onMouseOut={(e) => (e.currentTarget.style.background = "rgba(38, 38, 38, 0.75)")}
    >
      {/* Home Icon SVG */}
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0567 5.6166V2.81047C20.0567 2.07145 19.4569 1.47166 18.7179 1.47166C17.9789 1.47166 17.3791 2.07145 17.3791 2.81047V3.78244L13.8777 1.419C12.2095 0.292624 10.0523 0.292624 8.38589 1.419L2.58441 5.33367C1.22954 6.24852 0.420898 7.7694 0.420898 9.40274V17.0911C0.420898 19.7972 2.62368 22 5.32985 22H16.9328C19.639 22 21.8418 19.7972 21.8418 17.0911V9.40274C21.8418 7.92738 21.1822 6.54484 20.0567 5.6166ZM19.1642 17.0911C19.1642 18.3219 18.1636 19.3224 16.9328 19.3224H5.32985C4.09904 19.3224 3.09851 18.3219 3.09851 17.0911V9.40274C3.09851 8.66015 3.46623 7.96933 4.08208 7.55341L9.88446 3.63874C10.2629 3.38258 10.6976 3.25406 11.1313 3.25406C11.5651 3.25406 12.0007 3.38258 12.3791 3.63874L18.1806 7.55341C18.7955 7.96933 19.1642 8.66015 19.1642 9.40274V17.0911Z" fill="#4F4C4C"/>
</svg>

    </Link>
  );
};

export default HomeButton;