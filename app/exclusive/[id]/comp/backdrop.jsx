import Image from "next/image";

export default function Backdrop({url}) {
  return (
    <div className="absolute left-0 top-0 h-full w-full opacity-10 -z-10">
      <Image
        src={url}
        width={500}
        height={300}
        alt="Backdrop"
        className="absolute h-full w-full object-cover object-center"
      />
      <div className="h-full w-full backdrop-blur-sm"></div>
    </div>
  );
}
