import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTutorApplicationSchema, type InsertTutorApplication } from "@shared/schema";
import { useCreateTutorApplication } from "@/hooks/use-tutor-applications";
import { Layout } from "@/components/ui/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, User, MapPin, BookOpen, GraduationCap, DollarSign, Phone, FileText } from "lucide-react";
import { motion } from "framer-motion";

const SUBJECTS_LIST = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "English", "Computer Science", "Economics", "History",
  "Accounting", "Statistics", "Art", "Music"
];

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Other"];

export default function Apply() {
  const [, setLocation] = useLocation();
  const mutation = useCreateTutorApplication();
  
  const form = useForm<InsertTutorApplication>({
    resolver: zodResolver(insertTutorApplicationSchema),
    defaultValues: {
      fullName: "",
      city: undefined,
      area: "",
      subjects: [],
      teachingMode: "online",
      qualification: "",
      experienceYears: 0,
      expectedSalary: "",
      phoneNumber: "",
      email: "",
      cnicFile: "",
    },
  });

  const onSubmit = (data: InsertTutorApplication) => {
    mutation.mutate(data, {
      onSuccess: () => setLocation("/success"),
    });
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tutor Application</h1>
            <p className="text-muted-foreground text-lg">
              Complete the form below to join our elite network of educators.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Progress/Header Strip */}
            <div className="h-2 bg-slate-100 w-full">
              <div className="h-full bg-primary w-1/3 rounded-r-full" />
            </div>

            <div className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  {/* Section 1: Personal Info */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-blue-50 p-2 rounded-lg text-primary">
                        <User className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Personal Details</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Ali Khan" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Email Address <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ali@example.com" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Phone Number</FormLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="0300 1234567" className="pl-10 h-12 rounded-xl" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                       <FormField
                        control={form.control}
                        name="cnicFile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Profile / CV Link <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="Google Drive / LinkedIn / Dropbox link" className="pl-10 h-12 rounded-xl" {...field} value={field.value || ''} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Section 2: Location */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Location</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">City</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl">
                                  <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CITIES.map(city => (
                                  <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Area / Neighborhood</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. DHA, Gulberg, F-10" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Section 3: Teaching Preferences */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-green-50 p-2 rounded-lg text-green-600">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Teaching Preferences</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="teachingMode"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-slate-700 font-semibold">Preferred Mode of Teaching</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              {['online', 'physical', 'both'].map((mode) => (
                                <FormItem key={mode}>
                                  <FormControl>
                                    <RadioGroupItem value={mode} className="peer sr-only" />
                                  </FormControl>
                                  <FormLabel className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-slate-50 hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all">
                                    <span className="capitalize font-bold text-lg">{mode}</span>
                                    <span className="text-xs text-muted-foreground mt-1 text-center">
                                      {mode === 'online' ? 'Zoom/Teams sessions' : mode === 'physical' ? 'Visit student homes' : 'Flexible arrangement'}
                                    </span>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subjects"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-slate-700 font-semibold text-lg">Subjects You Can Teach</FormLabel>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {SUBJECTS_LIST.map((subject) => (
                              <FormField
                                key={subject}
                                control={form.control}
                                name="subjects"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={subject}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(subject)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, subject])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== subject
                                                  )
                                                )
                                          }}
                                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-slate-300"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer text-slate-600">
                                        {subject}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 4: Qualification */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Qualification & Rates</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                       <FormField
                        control={form.control}
                        name="qualification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Highest Qualification</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. BS Computer Science" className="h-12 rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                       <FormField
                        control={form.control}
                        name="experienceYears"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Experience (Years)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" className="h-12 rounded-xl" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                     <FormField
                        control={form.control}
                        name="expectedSalary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Expected Rate / Salary</FormLabel>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="e.g. 2000/hr or 25000/month" className="pl-10 h-12 rounded-xl" {...field} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                  </section>

                  <div className="pt-8 flex justify-end">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full md:w-auto px-8 h-12 text-lg rounded-xl font-bold shadow-lg shadow-primary/25"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
