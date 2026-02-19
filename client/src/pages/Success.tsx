import { Link } from "wouter";
import { Layout } from "@/components/ui/Layout";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Success() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-12 text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Thank you for applying to TutorConnect. We have received your details and will review your profile shortly.
          </p>

          <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-2">What happens next?</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                Our team will verify your credentials within 48 hours.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                You will receive an email to schedule a short interview.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                Once approved, your profile will go live!
              </li>
            </ul>
          </div>

          <Link href="/">
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Back to Home <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
