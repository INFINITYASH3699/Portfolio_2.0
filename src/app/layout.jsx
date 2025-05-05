import "./globals.css";

export const metadata = {
  title: "Yash Hulle | Web Developer",
  description: "Portfolio of Yash Hulle, a passionate Web Developer skilled in JavaScript, Next.js, and MERN stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="animated-background" />
        {children}
      </body>
    </html>
  );
}
