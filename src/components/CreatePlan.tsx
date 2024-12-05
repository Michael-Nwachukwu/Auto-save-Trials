"use client"

// * @dev - This component should handle approving the total amount of tokens to beautosasved by the formula 
// * const totalAmount = amount * Math.floor(duration / frequency);
// * Approve the ERC20 token
// * Call the createAutomatedSavingsPlan function

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { parseUnits } from "viem"
import { ethers } from "ethers"

const tokenAddress = "0x40c56d5eaf26F014272941448280A33FF6F6e5D4";


const FormSchema = z.object({
    token: z.string().min(2, {
        message: "token must be at least 2 characters.",
    }),
    amount: z.number().positive({
        message: "token must be at least 2 characters.",
    }),
    frequency: z.number().positive({
        message: "token must be at least 2 characters.",
    }),
    duration: z.number().positive({
        message: "token must be at least 2 characters.",
    }),
})

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            token: "",
            amount: 0,
            frequency: 0,
            duration: 0,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { token, amount, frequency, duration } = data;

        const totalAmount = amount * Math.floor(duration / frequency);

        // Approve the ERC20 token
        try {
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
            const tx = await tokenContract.approve("0xfd22a135213ee2F818845b91Cc8ab33e6B79F381", parseUnits(amount.toString(), 18));
            await tx.wait();
            console.log("Approval successful:", tx);
        } catch (error) {
            console.error("Approval failed:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>token</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>token</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>token</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>token</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
