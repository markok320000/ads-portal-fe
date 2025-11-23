"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export interface AdsParams {
    status: string | null
    type: string | null
    sort: string
}

export function useAdsParams() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value === null) {
                params.delete(name)
            } else {
                params.set(name, value)
            }
            return params.toString()
        },
        [searchParams]
    )

    const setParam = useCallback(
        (name: string, value: string | null) => {
            router.push(pathname + "?" + createQueryString(name, value))
        },
        [router, pathname, createQueryString]
    )

    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const sort = searchParams.get("sort") || "purchaseDate,desc"

    return {
        status,
        type,
        sort,
        setStatus: (val: string | null) => setParam("status", val),
        setType: (val: string | null) => setParam("type", val),
        setSort: (val: string) => setParam("sort", val),
        clearParams: () => {
            const params = new URLSearchParams(searchParams.toString())
            params.delete("status")
            params.delete("type")
            router.push(pathname + "?" + params.toString())
        }
    }
}
