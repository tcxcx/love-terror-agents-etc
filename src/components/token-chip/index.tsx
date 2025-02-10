import { NATIVE_TOKEN_ADDRESS } from "@/constants/Tokens";
import { Chain, Token } from "@/types";
import { cn } from "@/lib/utils";
import { pressable } from "@/utils/theme";
import Image from "next/image";
/**
 * Small button that display a given token symbol and image.
 *
 * WARNING: This component is under development and
 *          may change in the next few weeks.
 */
interface TokenChipProps {
  token: Token;
  onClick?: (token: Token) => void;
  className?: string;
  amount?: string;
  chain?: Chain;
}

export function TokenChip({ token, onClick, className }: TokenChipProps) {
  return (
    <button
      type="button"
      data-testid="ockTokenChip_Button"
      className={cn(
        pressable.secondary,
        pressable.shadow,
        "flex w-fit shrink-0 items-center gap-1 rounded-lg py-1 pr-3 pl-1 ",
        className
      )}
      onClick={() => onClick?.(token)}
    >
      <Image src={token?.image} alt={token?.symbol} width={24} height={24} />
    </button>
  );
}
