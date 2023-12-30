import { closeChap } from "@/redux/features/chapdiag";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiWorld } from "react-icons/bi";
import { FaFileImage } from "react-icons/fa";

export default function ChapDialog() {
  const chapdiag = useSelector(state => state.chapdiag);
  const dispatch = useDispatch();

  return (
    <Transition appear show={chapdiag.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(closeChap())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0 scale-[1.3]"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-[1.3]"
        >
          <div className="fixed inset-0 flex items-end bg-black/70 p-4 backdrop-blur-sm">
            <Dialog.Panel className="mx-auto mb-20 flex w-full max-w-[500px] flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 md:mb-40">
              <div className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet culpa corporis aliquam recusandae,</div>
              <section className="flex justify-around gap-3 text-[0.9rem] font-semibold text-white">
                <Link
                  href={chapdiag.url}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2"
                >
                  Visit website <BiWorld />
                </Link>
                <Link
                  href={`/reads/${chapdiag.id}`}
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-3 py-2"
                >
                  Fetch image <FaFileImage />
                </Link>
              </section>
              {/* <button className="text-sm font-medium text-red-800" onClick={() => dispatch(closeChap())}>
                Close
              </button> */}
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
