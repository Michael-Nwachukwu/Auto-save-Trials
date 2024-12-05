"use client";

// * @dev - This component should handle approving the total amount of tokens to beautosasved by the formula
// * const totalAmount = amount * Math.floor(duration / frequency);
// * Approve the ERC20 token
// * Call the createAutomatedSavingsPlan function
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { erc20Abi } from "viem";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/wagmi";
import { useState } from "react";
import { Label } from "./ui/label";

const tokenAddress = "0x40c56d5eaf26F014272941448280A33FF6F6e5D4";
const contractAddress = "0xfd22a135213ee2F818845b91Cc8ab33e6B79F381";

export function InputForm() {
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [duration, setDuration] = useState(0);
  const { writeContractAsync } = useWriteContract();

  const handleCreateSavingsPlan = async () => {
    if (!amount || !frequency || !duration)
      return alert("Error, please fill in all form fields!");

    const totalAmount = amount * Math.floor(duration / (frequency/(60*24)));
    console.log(totalAmount);

    try {
        const approveResponse = await writeContractAsync({
            address: tokenAddress as `0x${string}`,
            functionName: "approve",
            abi: erc20Abi,
            args: [contractAddress as `0x${string}`, BigInt(totalAmount * 10 ** 18)],
          });
      
          // Check if the approve transaction was successful
          if (approveResponse) {
            console.log(`Approve transaction successful: ${approveResponse}`);
      
            // Step 2: Wait until the transaction is mined
            const approveTransactionReceipt = await waitForTransactionReceipt(
              config,
              {
                hash: approveResponse,
              }
            );
      
            console.log(approveTransactionReceipt);
      
            if (approveTransactionReceipt.status === "success") {
              console.log(
                "Approve transaction confirmed, proceeding with creating automated savings plan..."
              );
            }
          }
    } catch (error) {
        alert(`An error occured ${error}`);
    }

    
  };

  return (
    <div className="space-y-4 max-w-md w-full">
      <div className="gap-2">
        <Label>Token</Label>
        <Input type="text" placeholder="Token" className="w-full" />
      </div>
      <div className="gap-2">
        <Label>Duration</Label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          placeholder="For How Long in days"
          className="w-full"
        />
      </div>
      <div className="gap-2">
        <Label>Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="Amount Per Time"
          className="w-full"
        />
      </div>
      <div className="gap-2">
        <Label>Frequency</Label>
        <Input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(parseInt(e.target.value))}
          placeholder="How often in days i.e. every 2 days..."
          className="w-full"
        />
      </div>

      <Button onClick={handleCreateSavingsPlan}>Create</Button>
    </div>
  );
}
