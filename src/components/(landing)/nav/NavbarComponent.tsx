"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Navbar1Props } from "@/lib/nav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/lib/auth";
import { ProfileComponent } from "@/components/ProfileComponent/ProfileComponent";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleComponent";

const NavbarComponent = ({  
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "home", url: "#" },
    { title: "products", url: "/product" },
    { title: "about", url: "/about" },
    { title: "contact", url: "#" }
  ],
  auth = {
    login: { title: "login", url: "/login" },
    signup: { title: "register", url: "/signup" },
  }
}: Navbar1Props) => {

  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('nav');

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(pathName === '/login' || pathName === '/signup') {
    return null;
  }

  const token = getAuthToken();
  console.log('token', token);

  return (
    <section 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden justify-between items-center lg:flex h-16">
          <div className="flex items-center gap-8">
            {/* Logo - FIXED: Removed legacyBehavior and multiple children */}
            <Link href={logo.url} className="flex items-center gap-3 group">
              <div className="relative">
                <Image 
                  src={logo.src} 
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
                  alt={logo.alt} 
                  width={32}
                  height={32}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white-500 to-white-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-white-600 transition-all duration-300">
                {logo.title}
              </span>
            </Link>

            {/* Navigation Menu - FIXED: Removed legacyBehavior */}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link 
                          href={item.url}
                          className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                            pathName === item.url 
                              ? 'text-blue-400 bg-white/10' 
                              : 'text-white hover:text-blue-300'
                          }`}
                        >
                          {t(item.title.toLowerCase()) || item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Auth Buttons - FIXED: Removed legacyBehavior */}
          <div className="flex items-center gap-3">
            {token ? (
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="font-medium hover:bg-white/10 text-white hover:text-blue-300 transition-all duration-200"
              >
                <Link href="/dashboard">{t('dashboard') || 'Dashboard'}</Link>
              </Button>
            ) : (
                  <Button 
              asChild 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={auth.login.url}>{t('login') || 'Login'}</Link>
            </Button>
            
              
            )}

            {
              token? (
            
                 <ProfileComponent/>
            
              ):(
                 <Button 
              asChild 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href={auth.signup.url}>{t('register') || 'Sign up'}</Link>
            </Button>
            
              )
            }
            
           
            {/* Language Switcher */}
            <LocaleSwitcher/>
          </div>
        </nav> 

        {/* Mobile Menu - FIXED: Removed legacyBehavior */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <Image 
                src={logo.src} 
                className="h-8 w-8" 
                alt={logo.alt} 
                width={32}
                height={32}
              />
              <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <LocaleSwitcher/>
              <MobileMenu logo={logo} menu={menu} auth={auth} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50"></div>
    </section>
  );
};

export { NavbarComponent };