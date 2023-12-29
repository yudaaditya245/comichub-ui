import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function PopoverEx() {
  return (
    <Popover className="relative ml-1">
      <Popover.Button className="flex items-center outline-none">
        <FaInfoCircle />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-10 z-20 mt-3 w-[200px] rounded bg-white px-4 py-3 text-left text-sm shadow-lg">
          <span className="font-bold">Exclusive comic</span> is a comic with a title not found on AniList database.
          <br />
          <br />
          It might be a new comic, or use a unique and/or uncommon title.
          <br />
          <br />
          If a comic isn't featured on this exclusive page, you can find it in the <span className="font-bold">All</span> section.
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
