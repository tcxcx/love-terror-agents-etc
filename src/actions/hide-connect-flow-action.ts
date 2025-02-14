"use server";

import { Cookies } from "@/utils/cookies";
import { addYears } from "date-fns";
import { cookies } from "next/headers";

export async function hideConnectFlowAction() {
  const cookieStore = await cookies();
  cookieStore.set(Cookies.HideConnectFlow, "true", {
    expires: addYears(new Date(), 1),
  });
}
