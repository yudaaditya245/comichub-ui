import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function BottomSheetModal({ children, name = "" }) {
  const params = useSearchParams();
  let _modal = params.get(name);
  let focusRef = useRef(null);

  const router = useRouter();
  const closeHandler = useDebouncedCallback(() => {
    // BUG WITH HEADLESS UI: the onClose func is triggered twice in mobile,
    // so cant use router.back() without debounced
    router.back();
  }, [50]);

  return (
    <Transition appear show={_modal ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHandler} initialFocus={focusRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <Dialog.Panel className="w-full rounded-t-xl bg-white p-5 pt-3 shadow" ref={focusRef}>
                <div className="flex w-full justify-center">
                  <div className="mb-4 h-[3px] w-[30px] rounded-full bg-black/30"></div>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
