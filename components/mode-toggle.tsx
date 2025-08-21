import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  return (
    <div className="relative">
      <details>
        <summary className="list-none cursor-pointer">
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
          </Button>
        </summary>
        <div className="absolute right-0 top-full mt-2 bg-background border rounded-lg shadow-lg p-2 z-50">
          <button 
            className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded"
            onClick={() => document.documentElement.classList.remove('dark')}
          >
            Светлая
          </button>
          <button 
            className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded"
            onClick={() => document.documentElement.classList.add('dark')}
          >
            Темная
          </button>
          <button 
            className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded"
            onClick={() => {
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            }}
          >
            Системная
          </button>
        </div>
      </details>
    </div>
  )
}