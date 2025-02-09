
export function truncateAddress(address: string, length: number = 6): string {
    if (!address) return "";
    if (address.length > 15) {
      return `${address.slice(0, length)}...${address.slice(-length)}`;
    } else {
      return address;
    }
  }