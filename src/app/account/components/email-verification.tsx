'use client'

import React, {useState} from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {AlertTriangle, CheckCircle, Mail} from 'lucide-react'
import {Badge} from '@/components/ui/badge'

interface EmailVerificationProps {
    verified?: boolean
    email?: string
    onVerify?: (token: string) => void
    onResend?: () => void
}

export const EmailVerification: React.FC<EmailVerificationProps> = ({
                                                                        verified,
                                                                        email,
                                                                        onVerify,
                                                                        onResend,
                                                                    }) => {
    const [verificationToken, setVerificationToken] = useState('')
    const [isSending, setIsSending] = useState(false)

    const handleVerify = () => {
        if (verificationToken.trim() && onVerify) {
            onVerify(verificationToken)
            setVerificationToken('')
        }
    }

    const handleResend = () => {
        setIsSending(true)
        onResend?.()
        setTimeout(() => setIsSending(false), 2000)
    }

    if (verified) {
        return (
            <Card className="shadow-md transition-all duration-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary"/>
                        Email Verification
                    </CardTitle>
                    <CardDescription>Your email address verification status.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center gap-3 rounded-xl border border-green-300 bg-green-50 p-3">
                        <CheckCircle className="h-6 w-6 text-green-600"/>
                        <div>
                            <p className="font-medium text-green-700">Email Verified</p>
                            <p className="text-sm text-green-600">{email}</p>
                        </div>
                        <Badge variant="default" className="ml-auto">
                            Verified
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-md transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary"/>
                    Email Verification
                </CardTitle>
                <CardDescription>Verify your email address to secure your account.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-orange-300 bg-orange-50 p-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600"/>
                    <div>
                        <p className="font-medium text-orange-700">Email Not Verified</p>
                        <p className="text-sm text-orange-600">{email}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto">
                        Unverified
                    </Badge>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <p className="text-sm text-blue-800">
                        A verification code has been sent to your email address. Enter it below to verify.
                    </p>
                </div>

                <div>
                    <Label htmlFor="verification-token">Verification Code</Label>
                    <div className="mt-1 flex gap-2">
                        <Input
                            id="verification-token"
                            value={verificationToken}
                            onChange={(e) => setVerificationToken(e.target.value)}
                            placeholder="Enter verification code"
                            className="flex-1"
                        />
                        <Button onClick={handleVerify} disabled={!verificationToken.trim()}>
                            Verify
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResend}
                        disabled={isSending}
                        className="px-0 text-sm text-muted-foreground hover:text-primary"
                    >
                        {isSending ? 'Sending...' : 'Resend Verification Code'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
