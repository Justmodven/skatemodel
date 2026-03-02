export const metadata = {
  title: "SkateModel — Find the Pro Who Plays Like You",
  description: "Match your playing style to one of 12 hockey archetypes. Study the pros who play your game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#e5e5ea" }}>
        {children}
      </body>
    </html>
  );
}
