"use client";

import React, { useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { InputMoney } from "../ui/input";
import { CurrencyDisplayerProps, Token } from "@/types";
import { TokenChip } from "../token-chip";
import { sizeStyles } from "@/lib/utils";
import { BaseSepoliaTokens } from "@/constants/Tokens";

const CurrencyDisplayer: React.FC<CurrencyDisplayerProps> = ({
  tokenAmount,
  onValueChange,
  initialAmount = 0,
  size = "base",
}) => {
  const [inputValue, setInputValue] = useState<string>(
    initialAmount.toFixed(3)
  );
  const token = BaseSepoliaTokens[0];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === "") {
      setInputValue("");
      onValueChange?.(0, 0);
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      const numericValue = parseFloat(value) || 0;
      onValueChange?.(numericValue, numericValue);
    }
  };

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
      </div>

      <div className="w-full flex justify-center">
        <TokenChip token={token} />
      </div>
    </div>
  );
};

export default CurrencyDisplayer;
