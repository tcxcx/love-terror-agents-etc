"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { InputMoney } from "@/components/ui/input";
import { useAccount, useChainId } from "wagmi";
import { formatUnits } from "viem";
import { Chain, CurrencyDisplayerProps, Token } from "@/types";
import * as chains from "@/utils/constants/Chains";
import { TokenChip } from "@/components/token-chip";
import { useGetTokensOrChain } from "@/hooks/use-tokens-or-chain";
import { useTokenBalance } from "@/hooks/use-user-balance";
import { NATIVE_TOKEN_ADDRESS } from "@/utils/constants/Tokens";
import { toast } from "@/hooks/use-toast";
import { sizeStyles } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getAllChains } from "@/utils/get-explorer";

const CurrencyDisplayer: React.FC<CurrencyDisplayerProps> = ({
  tokenAmount,
  onValueChange,
  initialAmount = 0,
  availableTokens = [],
  onTokenSelect,
  currentNetwork,
  size = "base",
  action = "request",
}) => {
  console.log(availableTokens, "availableTokens");
  const chainId = useChainId();
  const tokens =
    useGetTokensOrChain(currentNetwork, "tokens") || availableTokens;

  const { address } = useAccount();

  const [selectedToken, setSelectedToken] = useState<Token | null>(
    availableTokens[0] || null
  );

  const [inputValue, setInputValue] = useState<string>(
    initialAmount.toFixed(3)
  );

  useEffect(() => {
    if (availableTokens.length > 0) {
      setSelectedToken(availableTokens[0]);
    }
  }, [availableTokens]);

  console.log(selectedToken, "selectedToken");

  const balance = useTokenBalance({
    address: address!,
    chainId: chainId!,
    tokenAddress:
      (selectedToken?.address as `0x${string}`) || NATIVE_TOKEN_ADDRESS,
    decimals: selectedToken?.decimals ?? 18,
  });

  const actualChain = getAllChains().find(
    (chain) => chain.chainId === currentNetwork
  );

  useEffect(() => {
    if (tokenAmount !== undefined) {
      setInputValue(tokenAmount.toString());
    }
  }, [tokenAmount]);

  const handleSelectChange = (value: string) => {
    const token = Array.isArray(tokens)
      ? tokens.find((t) => t?.address === value || t?.symbol === value)
      : undefined;

    if (token) {
      setSelectedToken(token);
      onTokenSelect(token);
      setInputValue("0.0000");
    }
  };
  const updateValues = (value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onValueChange(0, numericValue);
    } else {
      onValueChange(0, 0);
    }
  };

  const getAvailableBalance = () => {
    const token = selectedToken;
    if (balance && token) {
      return parseFloat(
        formatUnits(balance.data?.value!, balance.data?.decimals!)
      );
    } else {
      return 0;
    }
  };

  const handleMaxClick = () => {
    const maxBalance = getAvailableBalance();
    setInputValue(maxBalance.toString());
    updateValues(maxBalance.toString());
  };

  const renderAvailableBalance = () => {
    if (balance.isLoading) {
      return <p className="text-xs">Loading balance...</p>;
    }
    const decimals = selectedToken?.decimals || 18;
    let displayBalance;
    if (decimals > 6) {
      displayBalance = getAvailableBalance().toFixed(4);
    } else {
      displayBalance = getAvailableBalance().toFixed(2);
    }

    return (
      <>
        <Button variant={"link"} className="text-xs" onClick={handleMaxClick}>
          Available balance (Max):
        </Button>
        <Button variant={"link"} className="text-xs" onClick={handleMaxClick}>
          {displayBalance}{" "}
          {selectedToken
            ? selectedToken.symbol
            : actualChain?.nativeCurrency.symbol}
        </Button>
      </>
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Permitir valores vacíos
    if (value === "") {
      setInputValue("");
      onValueChange(0, 0);
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value); // Actualizar el valor ingresado directamente

      // Intentar convertir el valor ingresado a un número (si es válido)
      const numericValue = parseFloat(value) || 0;

      if (action === "default") {
        const availableBalance = parseFloat(
          formatUnits(balance.data?.value || 0n, balance.data?.decimals || 18)
        );

        if (numericValue > availableBalance) {
          toast({
            title: "Insufficient balance",
            description:
              "You do not have enough balance to perform this action",
          });
          return;
        }
      }

      onValueChange(numericValue, numericValue);
    }
  };

  const getTokenValue = (token: Token) => token.address || token.symbol;

  return (
    <div
      className={cn(
        "mx-auto flex flex-col items-center",
        sizeStyles.container[size]
      )}
    >
      <div className="relative mb-2 text-center">
        <div className="relative flex justify-center">
          <InputMoney
            placeholder="0.0000"
            value={inputValue}
            type="text"
            onChange={handleInputChange}
            className={cn("text-center w-full", sizeStyles.input[size])}
          />
        </div>
        <div className="text-xs text-red-500 mb-2"></div>
      </div>
      {action !== "pay" && (
        <div className="mx-auto mt-2 block text-xs w-full items-center justify-between">
          {renderAvailableBalance()}
        </div>
      )}

      <div className="w-full">
        <Select
          onValueChange={handleSelectChange}
          value={selectedToken?.address}
        >
          <SelectTrigger className="w-full border-transparent flex justify-between">
            <SelectValue>
              {/* {selectedToken && currentNetwork && (
                <div className="flex items-center">
                  <img
                    src={selectedToken.image}
                    alt={
                      Object.values(chains).find(
                        (chain) => chain.chainId === currentNetwork
                      )?.name || "Ethereum"
                    }
                    className="inline-block w-4 h-4 mr-2"
                  />
                  {selectedToken.symbol}
                </div>
              )} */}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-full justify-between">
            {availableTokens?.length > 0 && (
              <SelectGroup className="justify-stretch">
                <SelectLabel>Tokens</SelectLabel>
                {availableTokens
                  .filter((token) => token.address)
                  .map((token: Token) => (
                    <SelectItem
                      key={token.address}
                      value={getTokenValue(token)}
                    >
                      <TokenChip token={token} chain={actualChain} />
                    </SelectItem>
                  ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CurrencyDisplayer;
