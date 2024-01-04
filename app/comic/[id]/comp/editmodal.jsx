import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import BottomSheetModal from "@/components/BottomSheetModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { anilistAPI } from "@/lib/anilistAPI";

export default function EditModal({ initialTitle = "" }) {
  const [title, setTitle] = useState(initialTitle);

  const { isPending, data, mutateAsync } = useMutation({
    mutationKey: ["fetchAniAPI", title],
    mutationFn: async () => {
      const _fetch = await anilistAPI(title);
      return _fetch;
    }
  });

  async function searchHandler(e) {
    e.preventDefault();
    mutateAsync();
  }

  console.log(!isPending && data);

  return (
    <BottomSheetModal name="comdiag">
      <div className="flex flex-col gap-4 font-normal">
        <div className="flex min-h-[3rem] w-full flex-col bg-red-500">{title}</div>
        {/* <div className="flex min-h-[3rem] w-full flex-col bg-red-500">{debouncedTitle}</div> */}
        <form onSubmit={searchHandler}>
          <input
            type="title"
            placeholder="Comic title"
            className="rounded border border-black/30 px-4 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <button type="submit" onClick={searchHandler}>
            Click
          </button>
        </form>
      </div>
    </BottomSheetModal>
  );
}
