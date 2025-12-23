"use client"

import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    BarChart3,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Users,
    Video,
} from "lucide-react"
import {AdFormatType} from "@/data/adFormats"
import {useGetAdFormatsQuery} from "@/store/services/adFormatsApi"

export default function Home() {
    const {data: adFormats = []} = useGetAdFormatsQuery()

    return (
        <div className="min-h-screen w-full bg-[#E0EEFF] overflow-hidden relative selection:bg-blue-200">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/60 to-transparent blur-3xl"/>

                <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] animate-pulse"/>
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[80px] animate-pulse"/>
            </div>

            <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-24">
                <div className="flex flex-col items-center">
                    <div className="mb-8 sm:mb-12 transition-transform duration-300 hover:scale-[1.02]">
                        <Image
                            src="/allchat-logo.png"
                            alt="AllChat Ads Portal"
                            width={640}
                            height={220}
                            priority
                            className="h-auto w-[200px] sm:w-[380px] md:w-[480px] drop-shadow-xl"
                        />
                    </div>

                    <div className="text-center max-w-4xl transition-opacity duration-300">
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                            Grow your business on <br className="hidden sm:block"/>
                            <span className="text-blue-600">AllChat</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-700 sm:text-xl leading-relaxed max-w-2xl mx-auto">
                            Launch high-conversion campaigns in minutes. Reach users directly in their conversations
                            with <strong>Text</strong>, <strong>Image</strong>, and <strong>Video</strong> ads.
                        </p>
                    </div>

                    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <Link href="/auth?view=register" className="w-full sm:w-auto">
                            <button
                                className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Create Ad Account
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </button>
                        </Link>

                        <Link href="/auth?view=login" className="w-full sm:w-auto">
                            <button
                                className="w-full inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-900 shadow-sm transition-all duration-200 hover:bg-white/80 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Log in
                            </button>
                        </Link>
                    </div>

                    <div className="mt-24 w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold text-slate-900">Choose your format</h2>
                        </div>

                        <div className="grid w-full gap-6 sm:grid-cols-3">
                            {adFormats.map((format) => {
                                let Icon = FileText
                                switch (format.type) {
                                    case AdFormatType.TEXT:
                                        Icon = MessageSquare
                                        break
                                    case AdFormatType.PHOTO:
                                        Icon = ImageIcon
                                        break
                                    case AdFormatType.VIDEO:
                                        Icon = Video
                                        break
                                }

                                return (
                                    <Link
                                        key={format.id}
                                        href={`/campaign?formatId=${format.id}`}
                                        className="block h-full"
                                    >
                                        <div
                                            className="group relative h-full rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-sm border border-white/50 flex flex-col items-start transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
                                        >
                                            <div
                                                className="mb-4 inline-flex items-center justify-center rounded-xl bg-[#E0EEFF] p-3 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white"
                                            >
                                                <Icon className="h-6 w-6"/>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                {format.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed max-w-sm">
                                                {format.description}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-8 text-center text-slate-600 opacity-80">
                        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                            <Users className="h-5 w-5"/>
                            <span className="font-medium">Reaching thousands of daily users</span>
                        </div>
                        <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
                        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                            <BarChart3 className="h-5 w-5"/>
                            <span className="font-medium">Real-time performance tracking</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
