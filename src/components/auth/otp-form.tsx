"use client"

import * as React from "react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"

export function OTPForm() {
    const [value, setValue] = React.useState("")

    return (
        <div className="space-y-4">
            <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Please enter the one-time password sent to your phone.</p>
            </div>
            <div className="flex justify-center">
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <Button className="w-full" disabled={value.length < 6}>Verify</Button>
        </div>
    )
}
