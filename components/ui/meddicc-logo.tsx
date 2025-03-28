import { lusitana } from "@/components/fonts/lusitana";
import Image from "next/image";

export default function MeddiccLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row gap-4 items-center leading-none text-white`}
    >
      <Image
        src="/meddicc_logo.png"
        alt="MEDDICC logo"
        width={50}
        height={50}
      />
      <p className="text-[44px]">MEDDICC</p>
    </div>
  );
}
