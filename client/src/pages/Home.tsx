import { Link } from "wouter";
import { Layout } from "@/components/ui/Layout";
import { ArrowRight, CheckCircle2, Users, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-sm font-semibold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now accepting new tutors
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 text-balance">
              Share Your Knowledge, <span className="text-primary">Inspire the Future.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
              Join the fastest growing network of professional educators. Set your own rates, choose your schedule, and make a real difference in students' lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-700 font-bold text-lg border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Teach with TutorConnect?</h2>
            <p className="text-muted-foreground text-lg">We provide the platform, tools, and students. You provide the expertise.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<DollarSign className="w-8 h-8 text-green-600" />}
              title="Competitive Earnings"
              description="Set your own hourly rates and keep 100% of your earnings for the first month."
              delay={0}
            />
            <BenefitCard 
              icon={<Calendar className="w-8 h-8 text-blue-600" />}
              title="Flexible Schedule"
              description="Work when you want. Our calendar tools make managing your availability effortless."
              delay={0.1}
            />
            <BenefitCard 
              icon={<Users className="w-8 h-8 text-purple-600" />}
              title="Global Reach"
              description="Connect with students locally for in-person sessions or globally via our online classroom."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join 5,000+ Tutors making a difference every day</h2>
              <div className="space-y-4">
                {['Verified Student Reviews', 'Secure Payment Protection', '24/7 Support Team'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              {/* Abstract decorative image */}
               <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 translate-y-8">
                  {/* Unsplash: Student studying */}
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative bg-slate-200">
                    {/* student studying with laptop */}
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80" alt="Student" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-100">
                    <div className="text-3xl font-bold text-primary mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-primary text-white rounded-2xl shadow-lg">
                    <div className="text-3xl font-bold mb-1">5k+</div>
                    <div className="text-sm text-primary-foreground/80">Active Tutors</div>
                  </div>
                  {/* Unsplash: Tutor teaching */}
                  <div className="rounded-2xl overflow-hidden shadow-lg h-48 relative bg-slate-200">
                    {/* tutor teaching */}
                    <img src="https://pixabay.com/get/g7ccd910cc37a0c88666193764d5c9e2783cce6128c58780492b6e8b4c12968971d05cad20e0bfe343bd8af2db00b384382ee5d233422e958f0f14e887fa3e123_1280.jpg" alt="Tutor" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-12 text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
              <p className="text-slate-300 text-lg mb-8">Create your profile in minutes and start connecting with students today.</p>
              <Link href="/apply">
                <button className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg shadow-primary/25">
                  Become a Tutor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function BenefitCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:border-slate-200 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
