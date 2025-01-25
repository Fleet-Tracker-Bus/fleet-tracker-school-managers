'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"

type Language = 'en' | 'fr' | 'ar'

interface LanguageOption {
  code: Language
  name: string
  direction: 'ltr' | 'rtl'
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', direction: 'ltr' },
  { code: 'fr', name: 'Français', direction: 'ltr' },
  { code: 'ar', name: 'العربية', direction: 'rtl' },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en')

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang)
    // Here you would typically update your app's language setting
    // For example: i18n.changeLanguage(lang)
  }

  return (
    <div className="flex min-h-screen p-4 space-x-2">
      {/* <Globe className="w-5 h-5 mr-2 text-black dark:text-white" /> */}
      <div className="flex rounded-lg shadow-sm gap-6">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={selectedLanguage === lang.code ? "default" : "outline"}
            className={`px-4 py-2 text-sm font-medium transition-colors
              ${selectedLanguage === lang.code ? 'text-black dark:text-white border border-black dark:border-white' : 'text-gray-400 hover:text-black hover:dark:text-white'}
              ${lang.direction === 'rtl' ? 'font-arabic' : ''}
              ${lang.code === 'ar' ? 'rounded-r-lg' : ''}
              ${lang.code === 'en' ? 'rounded-l-lg' : ''}
            `}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="mr-2">{lang.name}</span>
            {selectedLanguage === lang.code && <Check className="w-4 h-4" />}
          </Button>
        ))}
      </div>
    </div>
  )
}

