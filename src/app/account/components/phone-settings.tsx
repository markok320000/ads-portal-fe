'use client'

import React, {useState} from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {AlertTriangle, CheckCircle, Edit, Phone, X} from 'lucide-react'
import {Badge} from '@/components/ui/badge'
import {Alert, AlertDescription} from '@/components/ui/alert'
import {PhoneInput} from 'react-international-phone'
import 'react-international-phone/style.css'

interface User {
    phoneNumber?: string | null
    phoneVerified?: boolean
}

interface PhoneSettingsProps {
    user: User
    onAddPhone?: (phoneNumber: string) => void
    onVerifyCode?: (code: string) => void
    onUpdatePhone?: (phoneNumber: string) => void
    error?: { message?: string } | Error | null
    loading?: boolean
}

export const PhoneSettings: React.FC<PhoneSettingsProps> = ({
                                                                user,
                                                                onAddPhone,
                                                                onVerifyCode,
                                                                onUpdatePhone,
                                                                error,
                                                                loading,
                                                            }) => {
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showVerificationInput, setShowVerificationInput] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')

    const hasPhoneNumber = !!user.phoneNumber
    const isVerified = user.phoneVerified

    const maskPhoneNumber = (phone: string) => {
        if (phone.length <= 4) return phone
        const lastFour = phone.slice(-4)
        return '*'.repeat(phone.length - 4) + lastFour
    }

    const handleAddPhone = () => {
        if (phoneNumber.trim()) {
            onAddPhone?.(phoneNumber)
            setShowVerificationInput(true)
        }
    }

    const handleUpdatePhone = () => {
        if (phoneNumber.trim() === user.phoneNumber?.trim()) {
            handleCancel()
            return
        }
        if (phoneNumber.trim()) {
            onUpdatePhone?.(phoneNumber)
            setIsEditing(false)
            setShowVerificationInput(true)
        }
    }

    const handleVerifyCode = () => {
        if (verificationCode.trim()) {
            onVerifyCode?.(verificationCode)
            setShowVerificationInput(false)
            setIsAdding(false)
            setIsEditing(false)
            setVerificationCode('')
        }
    }

    const handleCancel = () => {
        setIsAdding(false)
        setIsEditing(false)
        setShowVerificationInput(false)
        setPhoneNumber('')
        setVerificationCode('')
    }

    return (
        <Card className="shadow-md transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary"/>
                    Phone Number
                </CardTitle>
                <CardDescription>
                    Manage your phone number for account security and notifications.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4"/>
                        <AlertDescription className="m-0 p-0">
                            {(error as Error)?.message || "Something went wrong. Please try again."}
                        </AlertDescription>
                    </Alert>
                )}
                {!hasPhoneNumber && !isAdding ? (
                    <Button onClick={() => setIsAdding(true)} className="w-fit" disabled={loading}>
                        Add Phone Number
                    </Button>
                ) : hasPhoneNumber && !isEditing && !showVerificationInput ? (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="mt-1 flex gap-2">
                                <Input
                                    id="phone"
                                    value={maskPhoneNumber(user.phoneNumber || '')}
                                    disabled
                                    className="flex-1"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setIsEditing(true)
                                        setPhoneNumber(user.phoneNumber || '')
                                    }}
                                    disabled={loading}
                                >
                                    <Edit className="h-4 w-4"/>
                                </Button>
                            </div>
                        </div>

                        {isVerified && (
                            <div className="flex items-center gap-3 rounded-xl border border-green-300 bg-green-50 p-3">
                                <CheckCircle className="h-6 w-6 text-green-600"/>
                                <div>
                                    <p className="font-medium text-green-700">Phone Verified</p>
                                    <p className="text-sm text-green-600">Your phone number is verified.</p>
                                </div>
                                <Badge variant="default" className="ml-auto">
                                    Verified
                                </Badge>
                            </div>
                        )}
                    </div>
                ) : !showVerificationInput ? (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="phone-input">Phone Number</Label>
                            <div className="mt-1">
                                <PhoneInput
                                    defaultCountry="us"
                                    value={phoneNumber}
                                    onChange={(phone: string) => setPhoneNumber(phone)}
                                    inputClassName="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    className="gap-2"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={isEditing ? handleUpdatePhone : handleAddPhone}
                                disabled={!phoneNumber.trim() || loading}
                            >
                                {isEditing ? 'Update' : 'Add'} Phone Number
                            </Button>
                            <Button variant="outline" onClick={handleCancel} disabled={loading}>
                                <X className="h-4 w-4 mr-1"/>
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <p className="text-sm text-blue-800">
                                A verification code has been sent to {phoneNumber}
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="verification-code">Verification Code</Label>
                            <div className="mt-1 flex gap-2">
                                <Input
                                    id="verification-code"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="123456"
                                    maxLength={6}
                                    disabled={loading}
                                />
                                <Button onClick={handleVerifyCode} disabled={!verificationCode.trim() || loading}>
                                    Verify
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-0 text-sm text-muted-foreground hover:text-primary"
                                disabled={loading}
                            >
                                Resend Code
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleCancel} className="text-sm"
                                    disabled={loading}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
