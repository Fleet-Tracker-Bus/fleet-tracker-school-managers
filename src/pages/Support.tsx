'use client'

import { useState } from 'react'
import { MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SupportContact() {
    const [activeTab, setActiveTab] = useState<'chat' | 'email' | 'phone'>('chat')

    const renderContent = () => {
        switch (activeTab) {
            case 'chat':
                return (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" />
                        </div>
                        <Button className="w-full bg-black text-white dark:bg-white dark:text-black">Start Chat</Button>
                    </div>
                )
            case 'email':
                return (
                    <div className="space-y-4">
                        <p>Send us an email at:</p>
                        <a href="mailto:support@fleettrackerschool.com" className="text-primary hover:underline flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            support@fleettrackerschool.com
                        </a>
                        <p>We typically respond within 24 hours.</p>
                    </div>
                )
            case 'phone':
                return (
                    <div className="space-y-4">
                        <p>Call us at:</p>
                        <a href="tel:+21250000000" className="text-primary hover:underline flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            +21250000000
                        </a>
                        <p>Our support line is open 24/7.</p>
                    </div>
                )
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center p-4'>
            <Card className="w-full max-w-md mx-auto text-black dark:text-white border border-black dark:border-white">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Contact Support</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Choose how you'd like to get in touch with us.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                        <Button
                            variant={activeTab === 'chat' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('chat')}
                            className={`w-full sm:w-auto ${ activeTab === 'chat' ? "bg-black text-white dark:bg-white dark:text-black" : "border-hidden"}`}
                        >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Chat
                        </Button>
                        <Button
                            variant={activeTab === 'email' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('email')}
                            className={`w-full sm:w-auto ${ activeTab === 'email' ? "bg-black text-white dark:bg-white dark:text-black" : "border-hidden"}`}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                        </Button>
                        <Button
                            variant={activeTab === 'phone' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('phone')}
                            className={`w-full sm:w-auto ${ activeTab === 'phone' ? "bg-black text-white dark:bg-white dark:text-black" : "border-hidden"}`}
                        >
                            <Phone className="mr-2 h-4 w-4" />
                            Phone
                        </Button>
                    </div>
                    {renderContent()}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                    <Button variant="outline" className="w-full sm:w-auto">
                        FAQs
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        Knowledge Base
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

