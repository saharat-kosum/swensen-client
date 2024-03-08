import React from "react";
import { useFormStatus } from "react-dom";

interface btnProp {
  pendingWord: string;
  notPendingWord: string;
}

function SubmitBtn(prop: btnProp) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="text-center w-full rounded-full h-12 bg-[#e21c23] text-white text-sm disabled:cursor-not-allowed disabled:bg-[#e21c23]/50"
    >
      {pending ? prop.pendingWord : prop.notPendingWord}
    </button>
  );
}

export default SubmitBtn;
