export const convertBigIntToHours = (deadline: bigint): number => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
  const deadlineInSeconds = Number(deadline); // Convert bigint to a regular number
  const timeDifferenceInSeconds = deadlineInSeconds - currentTimeInSeconds; // Find the difference
  const hours = timeDifferenceInSeconds / 3600; // Convert seconds back to hours

  return Math.floor(hours); // Return the hours difference
};

export const truncateWalletAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const bigintToIndexes = (value: bigint): number[] => {
  const indexes: number[] = [];

  for (let bitPosition = BigInt(0); value > BigInt(0); bitPosition++) {
    if (value & BigInt(1)) {
      indexes.push(Number(bitPosition)); // Convert bit position to a number
    }
    value >>= BigInt(1); // Right shift the bigint to check the next bit
  }

  return indexes;
};
