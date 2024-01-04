import { Popover, Transition } from "@headlessui/react";
import { useQueryState } from "next-usequerystate";
import { Fragment } from "react";
import { BsFillGearFill } from "react-icons/bs";
import { MdEditDocument } from "react-icons/md";
import { TbReload } from "react-icons/tb";

export default function Settings() {
  const [_, setComdiag] = useQueryState("comdiag");

  return (
    <Popover className="relative">
      <Popover.Button className="h-full rounded bg-white px-3 shadow">
        <BsFillGearFill className="text-black/70" size={16} />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 -translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-6"
      >
        <Popover.Panel
          className="absolute right-0 top-[3rem] z-10 flex w-screen max-w-[200px] flex-col 
                        rounded bg-white py-2 text-black/80 shadow-md"
        >
          {({ close }) => (
            <>
              <button
                className="flex items-center gap-3 px-5 py-2"
                onClick={() => {
                  setComdiag(1, { history: "push", shallow: false });
                  close();
                }}
              >
                <MdEditDocument className="h-7 w-7 rounded bg-black/10 p-[0.3rem]" />
                Change comic data
              </button>
              <button className="flex items-center gap-3 px-5 py-2">
                <TbReload className="h-7 w-7 rounded bg-black/10 p-[0.3rem]" />
                Refetch comic data
              </button>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
