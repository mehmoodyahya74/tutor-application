import { Link } from "wouter";
import { GraduationCap } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <span>TutorConnect</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Why Join?</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">FAQ</a>
            <Link href="/apply">
              <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md">
                Apply Now
              </button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-display font-bold text-xl text-primary mb-4">
                <GraduationCap className="w-6 h-6" />
                <span>TutorConnect</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Connecting passionate educators with students who need them. Join our network of professional tutors today.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li><Link href="/apply" className="hover:text-primary">Become a Tutor</Link></li>
                <li><a href="#" className="hover:text-primary">Find a Tutor</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TutorConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
