'use client'

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

        const handler = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light')
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [systemTheme])

    const getBorderClass = (mode: 'light' | 'dark' | 'system') => {
        if (theme === 'system') {
            return mode === 'system' ? 'border-white dark:border-white' : 'border-border'
        }
        if (mode === 'system') {
            return 'border-border'
        }
        return theme === mode ? 'border-black dark:border-white' : 'border-border'
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-4 min-h-screen">
            {/* Light Mode Option */}
            <button
                onClick={() => setTheme("light")}
                className="flex flex-col items-center gap-2"
            >
                <div className={`w-[280px] h-[180px] rounded-xl p-4 bg-white border-2 transition-all ${getBorderClass('light')}`}>
                    <div className="space-y-4">
                        <div className="h-4 bg-slate-400 rounded-md w-3/4" />
                        <div className="h-4 bg-slate-400 rounded-md w-1/2" />
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-slate-400 rounded-full" />
                            <div className="h-4 bg-slate-400 rounded-md flex-1" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-slate-400 rounded-full" />
                            <div className="h-4 bg-slate-400 rounded-md flex-1" />
                        </div>
                    </div>
                </div>
                <span className="font-bold text-black dark:text-white">Light</span>
            </button>

            {/* Dark Mode Option */}
            <button
                onClick={() => setTheme("dark")}
                className="flex flex-col items-center gap-2"
            >
                <div className={`w-[280px] h-[180px] rounded-xl p-4 bg-slate-950 border-2 transition-all ${getBorderClass('dark')}`}>
                    <div className="space-y-4">
                        <div className="h-4 bg-slate-800 rounded-md w-3/4" />
                        <div className="h-4 bg-slate-800 rounded-md w-1/2" />
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-slate-800 rounded-full" />
                            <div className="h-4 bg-slate-800 rounded-md flex-1" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-slate-800 rounded-full" />
                            <div className="h-4 bg-slate-800 rounded-md flex-1" />
                        </div>
                    </div>
                </div>
                <span className="font-bold text-black dark:text-white">Dark</span>
            </button>

            {/* System Option */}
            <button
                onClick={() => setTheme("system")}
                className="flex flex-col items-center gap-2"
            >
                <div className={`flex w-[280px] h-[180px] overflow-hidden rounded-xl bg-slate-950 border-2 transition-all ${getBorderClass('system')}`}>
                    <div className="flex-1 bg-red-500 h-full p-4 bg-white">
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-400 rounded-md w-3/4" />
                            <div className="h-4 bg-slate-400 rounded-md w-1/2" />
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-slate-400 rounded-full" />
                                <div className="h-4 bg-slate-400 rounded-md flex-1" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-slate-400 rounded-full" />
                                <div className="h-4 bg-slate-400 rounded-md flex-1" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-950 h-full p-4">
                        <div className="space-y-4">
                            <div className="h-4 bg-slate-800 rounded-md w-3/4" />
                            <div className="h-4 bg-slate-800 rounded-md w-1/2" />
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-slate-800 rounded-full" />
                                <div className="h-4 bg-slate-800 rounded-md flex-1" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-slate-800 rounded-full" />
                                <div className="h-4 bg-slate-800 rounded-md flex-1" />
                            </div>
                        </div>
                    </div>
                </div>
                <span className="font-bold text-black dark:text-white">System</span>
            </button>
        </div>
    )
}

