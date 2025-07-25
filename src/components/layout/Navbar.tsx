'use client'

import { Shield, LayoutDashboard, CctvIcon, TvMinimal, LucideTriangleAlert, Users } from 'lucide-react'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="relative bg-black/95 backdrop-blur-sm border-b border-gray-800/50 px-3 sm:px-4 md:px-6 py-3 md:py-4 shadow-xl font-['Inter',sans-serif]" style={{
           background: 'radial-gradient(ellipse at top center, rgba(255, 204, 0, 0.15) 0%, transparent 70%), #000000'
         }}>
      <div className="flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-4 lg:space-x-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#FFCC00]" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-bold text-white tracking-wide">MANDLACX</span>
              <div className="text-xs text-gray-400 font-medium">SecureSight v2.0</div>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-bold text-white tracking-wide">MX</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <button className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200">
              <LayoutDashboard size={16} color="#FFCC00" className='inline-block space-x-5'/> Dashboard
            </button>
            <button className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200">
              <CctvIcon size={16} color="#ffffff" className='inline-block space-x-5' /> Cameras
            </button>
            <button className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200">
              <TvMinimal size={16} color="#ffffff" className='inline-block space-x-5' /> Scenes
            </button>
            <button className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
              <LucideTriangleAlert size={16} color="#ffffff" className='inline-block space-x-5' /> Incidents
            </button>
            <button className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
              <Users size={16} color="#ffffff" className='inline-block space-x-5' /> Users
            </button>
          </div>
        </div>

        {/* Status and User Profile */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* User Profile */}
          <div className="flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-1.5 md:py-2 bg-black/50 rounded-xl">
            <div className="relative">
              <Image 
                src="/images/thumbnails/profile.jpg" 
                alt="Profile" 
                width={36}
                height={36}
                className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MjYyNjIiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+'
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xs md:text-sm font-semibold text-white">Vidita Singh</div>
              <div className="text-xs text-gray-400">viditasingh.sde@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
