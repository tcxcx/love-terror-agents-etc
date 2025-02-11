import { Button } from "@/components/ui/button";
import CurrencyDisplayer from "@/components/currency";
import { LinkUiFormProps } from "@/types";

export default function LinkUiForm({
  tokenAmount,
  handleValueChange,
  availableTokens,
  setSelectedToken,
  chainId,
  handleCreateLinkClick,
  isPeanutLoading,
}: LinkUiFormProps) {
  return (
    <>
      <div className="flex w-full md:h-[100px] lg:h-[200px] flex-col justify-between rounded-xl border">
        <div className="px-4 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-xl">💸💕💸</span>
            <span>Send $LOVE quest</span>
          </div>
          <CurrencyDisplayer
            tokenAmount={tokenAmount}
            onValueChange={handleValueChange}
            availableTokens={availableTokens}
            onTokenSelect={setSelectedToken}
            currentNetwork={chainId!}
            size="lg"
            action="default"
          />
        </div>
      </div>
      <div className="flex justify-between w-full space-x-2">
        <Button
          size={"lg"}
          className="mt-5 flex items-center gap-2 self-end w-full"
          onClick={handleCreateLinkClick}
          disabled={isPeanutLoading}
        >
          <span>Create Link 🌹</span>
        </Button>
      </div>
    </>
  );
}
