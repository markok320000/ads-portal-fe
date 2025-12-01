'use client'

import React, {useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Checkbox} from '@/components/ui/checkbox'
import {Mail} from 'lucide-react'
import {Button} from '@/components/ui/button'

interface EmailSettingsProps {
    email: string
    emailNotifications?: boolean
    marketingEmails?: boolean
    onUpdateEmail?: (email: string) => void
    onUpdateNotifications?: (notifications: boolean) => void
    onUpdateMarketing?: (marketing: boolean) => void
}

export const EmailSettings: React.FC<EmailSettingsProps> = ({
                                                                email,
                                                                emailNotifications = false,
                                                                marketingEmails = false,
                                                                onUpdateEmail,
                                                                onUpdateNotifications,
                                                                onUpdateMarketing,
                                                            }) => {
    const [currentEmail, setCurrentEmail] = useState(email)
    const [receiveNotifications, setReceiveNotifications] = useState(emailNotifications)
    const [receiveMarketing, setReceiveMarketing] = useState(marketingEmails)

    const handleEmailChange = () => {
        if (currentEmail !== email && onUpdateEmail) {
            onUpdateEmail(currentEmail)
        }
    }

    const handleNotificationsChange = (checked: boolean) => {
        setReceiveNotifications(checked)
        onUpdateNotifications?.(checked)
    }

    const handleMarketingChange = (checked: boolean) => {
        setReceiveMarketing(checked)
        onUpdateMarketing?.(checked)
    }

    return (
        <Card className="shadow-md transition-all duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary"/>
                    Email Settings
                </CardTitle>
                <CardDescription>
                    Configure your email preferences and notifications.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                        <Input
                            id="email"
                            type="email"
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleEmailChange}
                            disabled={currentEmail === email}
                            variant="outline"
                        >
                            Update
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="email-notifications"
                        checked={receiveNotifications}
                        onCheckedChange={handleNotificationsChange}
                    />
                    <Label htmlFor="email-notifications" className="text-sm font-normal cursor-pointer">
                        Receive email notifications
                    </Label>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="marketing-emails"
                        checked={receiveMarketing}
                        onCheckedChange={handleMarketingChange}
                    />
                    <Label htmlFor="marketing-emails" className="text-sm font-normal cursor-pointer">
                        Receive marketing emails
                    </Label>
                </div>
            </CardContent>
        </Card>
    )
}
