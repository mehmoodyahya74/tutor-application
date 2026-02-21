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
  "Nazra (Basic Quran Reading)",
  "Hifz",
  "Tajweed",
  "Translation",
  "Tafseer",
  "Kids Beginner",
  "Adults"
];

const CITIES = [
  "Abbottabad",
  "Adezai",
  "Ahmadpur East",
  "Ahmed Nager Chatha",
  "Akora Khattak",
  "Ali Khan Abad",
  "Alipur",
  "Alpuri",
  "Alyabad Hunza",
  "Amirabad",
  "Arifwala",
  "Askole",
  "Astore",
  "Attock",
  "Awaran",
  "Ayubia",
  "Badin",
  "Bahawalnagar",
  "Bahawalpur",
  "Bajaur",
  "Banda Daud Shah",
  "Bannu",
  "Barkhan",
  "Batkhela",
  "Battagram",
  "Bhakkar",
  "Bhalwal",
  "Bhera",
  "Bhiria City",
  "Bhiria Road",
  "Bhirkan",
  "Birote",
  "Bunji",
  "Burewala",
  "Chagai",
  "Chak",
  "Chak Jhumra",
  "Chakdara",
  "Chakwal",
  "Chalt (Nagar)",
  "Charsadda",
  "Cherat",
  "Chichawatni",
  "Chilas",
  "Chillianwala",
  "Chillinji",
  "Chiniot",
  "Chiran",
  "Chishtian",
  "Chitral",
  "Choa Saidanshah",
  "Chunian",
  "Dadu",
  "Daggar",
  "Dajkot",
  "Danyore",
  "Dargai",
  "Darya Khan",
  "Daska",
  "Davispur",
  "Dera Bugti",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Dhaular",
  "Dhudial",
  "Digri",
  "Dina",
  "Dinga",
  "Dipalpur",
  "Diplo",
  "Dir",
  "District Loralai",
  "District Nushki",
  "Doaba",
  "Dokri",
  "Drosh",
  "Faisalabad",
  "Fateh Jang",
  "Gakuch",
  "Ghakhar Mandi",
  "Ghangche",
  "Ghizer",
  "Ghotki",
  "Ghulmat (Nagar)",
  "Gilgit",
  "Gojra",
  "Gorikot",
  "Gujar Khan",
  "Gujranwala",
  "Gujrat",
  "Gulmit",
  "Gwadar",
  "Haala",
  "Hafizabad",
  "Hangu",
  "Harappa",
  "Haripur",
  "Harnai",
  "Haroonabad",
  "Hasilpur",
  "Haveli Lakha",
  "Hussain Abad",
  "Hyderabad",
  "Ishkoman",
  "Islamabad",
  "Islamkot",
  "Jacobabad",
  "Jafarabad",
  "Jaglot",
  "Jalalabad",
  "Jalalpur Jattan",
  "Jampur",
  "Jamshoro",
  "Jaranwala",
  "Jauharabad",
  "Jhal",
  "Jhang",
  "Jhelum",
  "Jungshahi",
  "Jutial",
  "Kachhi",
  "Kalabagh",
  "Kalat",
  "Kallar Syedan",
  "Kamalia",
  "Kamoke",
  "Kandhkot",
  "Kandiaro",
  "Karachi",
  "Karak",
  "Karimabad (Hunza)",
  "Karor Lal Esan",
  "Kashmore",
  "Kasur",
  "Kech",
  "Keti Bandar",
  "Khadro",
  "Khairpur",
  "Khanabad",
  "Khanewal",
  "Khanpur",
  "Khanqah Sharif",
  "Khaplu",
  "Kharan",
  "Kharian",
  "Khipro",
  "Khushab",
  "Khuzdar",
  "Khyber",
  "Killa Abdullah",
  "Killa Saifullah",
  "Kohat",
  "Kohlu",
  "Kot Adu",
  "Kotri",
  "Kulachi",
  "Kurram",
  "Lahore",
  "Lakhi Ghulam Shah",
  "Lakki Marwat",
  "Lalamusa",
  "Larkana",
  "Lasbela",
  "Latamber",
  "Lawa Chakwal",
  "Layyah",
  "Lehri",
  "Liaquat Pur",
  "Lodhran",
  "Madyan",
  "Magsi",
  "Mailsi",
  "Makran",
  "Malakwal",
  "Mamoori",
  "Mand",
  "Mandi Bahauddin",
  "Manjhand",
  "Mansehra",
  "Maqsood Rind",
  "Mardan",
  "Mastuj",
  "Mastung",
  "Matiari",
  "Mayoon",
  "Mehar",
  "Mehrabpur",
  "Mian Channu",
  "Mian Sahib",
  "Miani",
  "Mianwali",
  "Mianwali Bangla",
  "Mingora",
  "Minimerg",
  "Mirpur Khas",
  "Misgar",
  "Mithani",
  "Mithi",
  "Mohmand",
  "Moro",
  "Multan",
  "Muridke",
  "Murree",
  "Musakhel",
  "Muzaffargarh",
  "Nagar Proper",
  "Nagarparkar",
  "Nankana Sahib",
  "Naran Kaghan Valley",
  "Narowal",
  "Nasir Abad",
  "Nasirabad",
  "Naudero",
  "Naushahro Feroze",
  "Nawabshah",
  "North Waziristan",
  "Nowshera",
  "Okara",
  "Orakzai",
  "Oshikhandass",
  "Pabbi",
  "Paharpur",
  "Pakpattan",
  "Panjgur",
  "Passu",
  "Pattoki",
  "Peshawar",
  "Pind Dadan Khan",
  "Pindi Bhattian",
  "Pir Jo Goth",
  "Pir Mahal",
  "Piryaloi",
  "Pishin",
  "Qaimpur",
  "Qambar",
  "Qasimabad",
  "Qasimabad Masoot (Nagar)",
  "Qila Didar Singh",
  "Qubo Saeed Khan",
  "Quetta",
  "Rabwah",
  "Rahim Yar Khan",
  "Raiwind",
  "Rajanpur",
  "Rajo Khanani",
  "Ranipur",
  "Ratodero",
  "Rawalpindi",
  "Renala Khurd",
  "Risalpur",
  "Rohri",
  "Sadiqabad",
  "Sagri",
  "Sahiwal",
  "Saidu Sharif",
  "Sakrand",
  "Samaro",
  "Sambrial",
  "Samundri",
  "Sanghar",
  "Sangla Hill",
  "Sann",
  "Sarai Alamgir",
  "Sargodha",
  "Shahbandar",
  "Shahdadkot",
  "Shahdadpur",
  "Shahpur Chakar",
  "Shahpur Jahania",
  "Shakargarh",
  "Sheikhupura",
  "Sherani",
  "Shewa Adda",
  "Shikarpur",
  "Shimshal",
  "Shujaabad",
  "Sialkot",
  "Sibi",
  "Sinjhoro",
  "Siranwali",
  "Sita Road",
  "Skardu",
  "Sohawa",
  "Sohbatpur",
  "Sohianwala",
  "South Waziristan",
  "Sukkur",
  "Sultanabad",
  "Sust",
  "Swabi",
  "Swat",
  "Taghafari",
  "Talagang",
  "Tandlianwala",
  "Tando Adam Khan",
  "Tando Allahyar",
  "Tando Muhammad Khan",
  "Tangi",
  "Tangwani",
  "Tank",
  "Taxila",
  "Thall",
  "Thari Mirwah",
  "Tharushah",
  "Thatta",
  "Thole (Nagar)",
  "Thorar",
  "Timergara",
  "Toba Tek Singh",
  "Tordher",
  "Umerkot",
  "Vehari",
  "Wah Cantonment",
  "Warah",
  "Washuk",
  "Wazirabad",
  "Yazman",
  "Zafarwal",
  "Zhob",
  "Ziarat"
];

// Sort cities alphabetically
const SORTED_CITIES = [...CITIES].sort();

// Add "Other" at the end (after sorting)
const CITY_OPTIONS = [...SORTED_CITIES, "Other"];

export default function Apply() {
  const [, setLocation] = useLocation();
  const mutation = useCreateTutorApplication();
  const [showOtherCity, setShowOtherCity] = useState(false);
  
  const form = useForm<InsertTutorApplication>({
    resolver: zodResolver(insertTutorApplicationSchema),
    defaultValues: {
      fullName: "",
      city: "",
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
            <div className="h-2 bg-slate-100 w-full">
              <div className="h-full bg-primary w-1/3 rounded-r-full" />
            </div>

            <div className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
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
                              <Input placeholder="e.g. Ali Khan" className="h-12 rounded-xl bg-white" {...field} />
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ali@example.com" className="h-12 rounded-xl bg-white" {...field} value={field.value || ''} />
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
                                <Input placeholder="0300 1234567" className="pl-10 h-12 rounded-xl bg-white" {...field} />
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Profile/CV Link <span className="text-slate-400 font-normal">(Optional)</span>
                            </FormLabel>
                            <div className="relative">
                              <FileText className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                              <FormControl>
                                <Input placeholder="Google Drive / LinkedIn / Dropbox link" className="pl-10 h-12 rounded-xl bg-white" {...field} value={field.value || ''} />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

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
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setShowOtherCity(value === "Other");
                              }} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl bg-white">
                                  <SelectValue placeholder="Select your city" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent 
                                className="bg-white border border-slate-200 shadow-lg max-h-80"
                                position="popper"
                                side="bottom"
                                align="start"
                              >
                                {CITY_OPTIONS.map(city => (
                                  <SelectItem 
                                    key={city} 
                                    value={city}
                                    className="hover:bg-slate-100 cursor-pointer"
                                  >
                                    {city}
                                  </SelectItem>
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
                              <Input placeholder="e.g. DHA, Gulberg, F-10" className="h-12 rounded-xl bg-white" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Show this input when "Other" is selected */}
                    {showOtherCity && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold">Please specify your city</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your city name" 
                                  className="h-12 rounded-xl bg-white" 
                                  onChange={(e) => field.onChange(e.target.value)}
                                  value={field.value === "Other" ? "" : field.value}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}
                  </section>

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
                                                  ) || []
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
                              <Input placeholder="e.g. BS Computer Science" className="h-12 rounded-xl bg-white" {...field} />
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
                              <Input 
                                type="number" 
                                min="0" 
                                className="h-12 rounded-xl bg-white" 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                                value={field.value}
                              />
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
                              <Input placeholder="e.g. 2000/hr or 25000/month" className="pl-10 h-12 rounded-xl bg-white" {...field} />
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
