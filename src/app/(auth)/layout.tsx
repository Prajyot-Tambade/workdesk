import Image from "next/image";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center pt-3 mx-2 mb-2 ring-1 ring-neutral-700 rounded-md overflow-hidden bg-black">
          <Image
          className="hidden md:block w-1/2"
          src="/esc.png"
          height={750}
          width={750}
          alt="esc"
          loading="eager"
          />
          <h2 className="text-2xl mt-8">Escape the hurdels of mananging huge projects</h2>
          <h3 className="text-2xl mt-8 self-">Workdesk</h3>
        </div>
        <div className="">{children}</div>
      </div>
    </section>
  );
};

export default layout;
