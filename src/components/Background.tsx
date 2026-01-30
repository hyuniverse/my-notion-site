import Image from "next/image";
import backgroundImage from "@/assets/img/back4.png";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}
