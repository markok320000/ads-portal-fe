'use client'

import React, {useState} from 'react'
import {Separator} from '@/components/ui/separator'
import {useUser} from '@/hooks/use-user'
import {UserRole} from '@/models/user-role'
import {EmailVerification} from './components/email-verification'
import {ChangePassword} from './components/change-password'
import {PhoneSettings} from './components/phone-settings'
import {EmailSettings} from './components/email-settings'
import {toast} from 'sonner'
import {SiteHeader} from '@/components/site-header'

export default function AccountSettingsPage() {
    const {user} = useUser()
    const [loading, setLoading] = useState(false)

    // Mock user data for the account settings
    const accountUser = {
        email: user?.email || 'user@example.com',
        verified: true, // Change to false to see unverified state
        phoneNumber: '+1 (555) 123-4567', // Set to null to test add phone flow
        phoneVerified: true,
        emailNotifications: true,
        marketingEmails: false,
    }

    // Boilerplate handlers
    const handleVerifyEmail = (token: string) => {
        console.log('Verifying email with token:', token)
        toast.success('Email verified successfully!')
        // TODO: Implement actual email verification logic
    }

    const handleResendEmailVerification = () => {
        console.log('Resending email verification')
        toast.success('Verification email sent!')
        // TODO: Implement actual resend logic
    }

    const handleChangePassword = async (currentPassword: string, newPassword: string) => {
        setLoading(true)
        console.log('Changing password')
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            toast.success('Password changed successfully!')
            // TODO: Implement actual password change logic
        }, 1000)
    }

    const handleAddPhone = (phoneNumber: string) => {
        console.log('Adding phone:', phoneNumber)
        toast.success('Verification code sent to phone!')
        // TODO: Implement actual add phone logic
    }

    const handleVerifyPhone = (code: string) => {
        console.log('Verifying phone with code:', code)
        toast.success('Phone verified successfully!')
        // TODO: Implement actual phone verification logic
    }

    const handleUpdatePhone = (phoneNumber: string) => {
        console.log('Updating phone:', phoneNumber)
        toast.success('Phone updated! Verification code sent.')
        // TODO: Implement actual phone update logic
    }

    const handleUpdateNotifications = (notifications: boolean) => {
        console.log('Email notifications:', notifications)
        toast.success('Notification preferences updated!')
        // TODO: Implement actual notification preferences update
    }

    const handleUpdateMarketing = (marketing: boolean) => {
        console.log('Marketing emails:', marketing)
        toast.success('Marketing preferences updated!')
        // TODO: Implement actual marketing preferences update
    }

    return (
        <div className="w-full">
            <SiteHeader
                title="Account Settings"
                description="Manage your account security and preferences."
            />
            {/* Added max-w-4xl and mx-auto to center content with max width */}
            <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 md:gap-6 md:py-6 space-y-6">
                <Separator/>

                {/* Email Verification */}
                <EmailVerification
                    verified={accountUser.verified}
                    email={accountUser.email}
                    onVerify={handleVerifyEmail}
                    onResend={handleResendEmailVerification}
                />

                <Separator/>

                {/* Change Password */}
                <ChangePassword onChangePassword={handleChangePassword} loading={loading}/>

                <Separator/>

                {/* Email Settings */}
                <EmailSettings
                    email={accountUser.email}
                    emailNotifications={accountUser.emailNotifications}
                    marketingEmails={accountUser.marketingEmails}
                    onUpdateNotifications={handleUpdateNotifications}
                    onUpdateMarketing={handleUpdateMarketing}
                />

                {/* Phone Settings - Only show for regular users, hide for admin */}
                {user?.role === UserRole.USER && (
                    <>
                        <Separator/>
                        <PhoneSettings
                            user={{
                                phoneNumber: accountUser.phoneNumber,
                                phoneVerified: accountUser.phoneVerified,
                            }}
                            onAddPhone={handleAddPhone}
                            onVerifyCode={handleVerifyPhone}
                            onUpdatePhone={handleUpdatePhone}
                            error={null}
                            loading={false}
                        />
                    </>
                )}
            </div>
        </div>
    )
}