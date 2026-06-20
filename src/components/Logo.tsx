import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 120, height: 37 },
  md: { width: 150, height: 46 },
  lg: { width: 200, height: 62 },
};

export default function Logo({
  variant = "dark",
  className = "",
  size = "md",
}: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={className}>
      <Image
        src="/logo-keylight.png"
        alt="KeyLight Lighting Products"
        width={width}
        height={height}
        priority
        style={{
          width,
          height: "auto",
          mixBlendMode: variant === "dark" ? "screen" : undefined,
        }}
      />
    </div>
  );
}
