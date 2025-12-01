"use client"
import Image from "next/image"
import Link from "next/link"
import {Image as ImageIcon, MessageSquare, Video} from "lucide-react"

export default function Home() {
    return (
        <div className="min-h-screen bg-[#E0EEFF]">
            <main className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 sm:py-24">
                {/* Logo */}
                <div className="relative mb-8 sm:mb-10">
                    <Image
                        src="/allchat-logo.png"
                        alt="AllChat Ads Portal"
                        width={640}
                        height={220}
                        priority
                        className="h-auto w-[280px] sm:w-[420px] md:w-[520px] lg:w-[640px] drop-shadow-lg"
                    />
                </div>

                {/* Hero copy */}
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-4">
                    Start Advertising
                </h1>
                <p className="mt-4 max-w-3xl text-center text-lg text-slate-700 sm:text-xl leading-relaxed">
                    We offer in-chat <strong>text</strong>, <strong>image</strong>, and <strong>video</strong> adverts.
                    Create an account to get started, or log in if you already have an account.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                    <Link
                        href="/signup"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Create an account
                    </Link>
                    <Link
                        href="/login"
                        className="inline-flex w-full items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-900 shadow-md transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Log in
                    </Link>
                </div>

                {/* Ad Types */}
                <section className="mt-20 w-full">
                    <h2 className="text-center text-2xl font-bold text-slate-900 mb-10">
                        Choose Your Ad Format
                    </h2>
                    <div className="grid w-full gap-6 sm:grid-cols-3">
                        {[
                            {
                                icon: MessageSquare,
                                title: "Text Ads",
                                desc: "Engage users with compelling text messages delivered directly in chat.",
                            },
                            {
                                icon: ImageIcon,
                                title: "Image Ads",
                                desc: "Capture attention with eye-catching visuals and branded imagery.",
                            },
                            {
                                icon: Video,
                                title: "Video Ads",
                                desc: "Tell your story with dynamic video content that drives engagement.",
                            },
                        ].map((card) => {
                            const Icon = card.icon
                            return (
                                <div
                                    key={card.title}
                                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                                >
                                    <div className="inline-flex p-3 rounded-lg bg-blue-100 mb-4">
                                        <Icon className="w-6 h-6 text-blue-600"/>
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-600 text-sm">
                        Join thousands of advertisers already growing their business with AllChat
                    </p>
                </div>
            </main>
        </div>
    )
}
