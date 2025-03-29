import Link from "next/link";
import { lusitana } from "@/components/fonts/lusitana";
import MeddiccLogo from "@/components/ui/meddicc-logo";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Landing",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <MeddiccLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            This is a simple full-stack tasks application made with NextJS,
            DRF,with authentication and PostgreSQL as part of the{" "}
            <span className="text-blue-500">MEDDICC</span> technical
            examination.
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/login">
              <Button size="lg">
                Login <ArrowRightIcon className="w-5 md:w-6" />
              </Button>
            </Link>
            <Link href="/register">
              <p className="text-slate-500 text-sm">
                Don&apos;t have an account? Register.
              </p>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6">
          <Image
            src="/hero-desktop.png"
            width={2000}
            height={1520}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}
