import { useEffect, useMemo, useCallback } from "react";
import { useDynamicContext, getNetwork } from "@dynamic-labs/sdk-react-core";
import { useNetworkStore } from "@/store";
import { ChainList } from "@/types";

export const useNetworkManager = (): ChainList => {
  const { network } = useDynamicContext();
  const { setCurrentChainId, setLoading, setError, currentChainId } =
    useNetworkStore();

  const connector = useMemo(() => network, [network]);

  const updateNetwork = useCallback(async () => {
    if (!connector) {
      setCurrentChainId(undefined);
      return;
    }

    setLoading(true);
    try {
      setCurrentChainId(network as number | undefined);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to get network"
      );
      setCurrentChainId(undefined);
    } finally {
      setLoading(false);
    }
  }, [network, setCurrentChainId, setError, setLoading, connector]);

  useEffect(() => {
    updateNetwork();
  }, [updateNetwork]);

  return currentChainId as ChainList;
};
