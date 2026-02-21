import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTutorApplicationSchema, type InsertTutorApplication } from "@shared/schema";
import { useCreateTutorApplication } from "@/hooks/use-tutor-applications";
import { Layout } from "@/components/ui/Layout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, User, MapPin, BookOpen, GraduationCap, DollarSign, Phone, FileText, Calendar, Clock, Heart, Shield } from "lucide-react";
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

const WEEKDAYS = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
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
  "Bhiria",
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
  "Chiniot",
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
  "Doaba",
  "Dokri",
  "Drosh",
  "Faisalabad",
  "Fateh Jang",
  "Gakuch",
  "Ghakhar Mandi",
  "Ghotki",
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
  "Killa Abdullah",
  "Killa Saifullah",
  "Kohat",
  "Kohlu",
  "Kot Adu",
  "Kotri",
  "Kulachi",
  "Lahore",
  "Lakhi Ghulam Shah",
  "Lakki Marwat",
  "Lalamusa",
  "Larkana",
  "Latamber",
  "Lawa Chakwal",
  "Layyah",
  "Lehri",
  "Liaquat Pur",
  "Lodhran",
  "Madyan",
  "Mailsi",
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
  "Moro",
  "Multan",
  "Muridke",
  "Murree",
  "Musakhel",
  "Muzaffargarh",
  "Nagar",
  "Nagarparkar",
  "Nankana Sahib",
  "Naran",
  "Narowal",
  "Nasirabad",
  "Naudero",
  "Naushahro Feroze",
  "Nawabshah",
  "Nowshera",
  "Okara",
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
  "Sukkur",
  "Sultanabad",
  "Sust",
  "Swabi",
  "Taghafari",
  "Talagang",
  "Tandlianwala",
  "Tando Adam",
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
  const [teachingMode, setTeachingMode] = useState("online");
  
  const form = useForm<InsertTutorApplication>({
    resolver: zodResolver(insertTutorApplicationSchema),
    defaultValues: {
      fullName: "",
      city: "",
      area: "",
      subjects: [],
      teachingMode: "online",
      travelDistance: "",
      islamicQualification: "",
      instituteName: "",
      experienceYears: 0,
      demoClassAvailable: "",
      daysAvailable: [],
      preferredTimeMorning: false,
      preferredTimeAfternoon: false,
      preferredTimeEvening: false,
      ratePerHour: "",
      ratePerMonth: "",
      shortBio: "",
      confirmAccuracy: false,
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

  // Check if physical teaching is selected (either "physical" or "both")
  const showTravelDistance = teachingMode === "physical" || teachingMode === "both";

  // Function to add "km" when input loses focus
  const handleTravelDistanceBlur = (e: React.FocusEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    let value = e.target.value.trim();
    
    // Remove any existing "km" or "KM" or "Km" (case insensitive)
    value = value.replace(/\s*km\s*$/i, '');
    
    // Remove any dots/periods
    value = value.replace(/\./g, '');
    
    // If there's a numeric value, add "km"
    if (value && !isNaN(Number(value))) {
      onChange(`${value} km`);
    } else if (value) {
      // If it's not purely numeric but has text, just clean it
      onChange(value);
    }
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
              Complete the form below to join our elite network of Quran educators.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="h-2 bg-slate-100 w-full">
              <div className="h-full bg-primary w-1/3 rounded-r-full" />
            </div>

            <div className="p-8 md:p-12">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  {/* Section 1: Personal Details */}
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Full Name <span className="text-red-500">*</span>
                            </FormLabel>
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Phone Number <span className="text-red-500">*</span>
                            </FormLabel>
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
                            <FormLabel className="text-slate-700 font-semibold">
                              City <span className="text-red-500">*</span>
                            </FormLabel>
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
                            <FormLabel className="text-slate-700 font-semibold">
                              Area / Neighborhood <span className="text-red-500">*</span>
                            </FormLabel>
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
                          <FormLabel className="text-slate-700 font-semibold">
                            Preferred Mode of Teaching <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                setTeachingMode(value);
                              }}
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

                    {/* Travel Distance - appears only when physical or both is selected */}
                    {showTravelDistance && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormField
                          control={form.control}
                          name="travelDistance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold">Maximum travel distance</FormLabel>
                              <div className="relative">
                                <Navigation className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                <FormControl>
                                  <Input 
                                    placeholder="e.g. 15" 
                                    className="pl-10 h-12 rounded-xl bg-white" 
                                    {...field}
                                    onBlur={(e) => handleTravelDistanceBlur(e, field.onChange)}
                                  />
                                </FormControl>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Enter a number (km will be added automatically)
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    <FormField
                      control={form.control}
                      name="subjects"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-slate-700 font-semibold text-lg">
                              Subjects You Can Teach <span className="text-red-500">*</span>
                            </FormLabel>
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

                  {/* Section 4: Qualification & Experience */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Qualification & Experience</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="islamicQualification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Highest Islamic Qualification <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl bg-white">
                                  <SelectValue placeholder="Select your qualification" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border border-slate-200 shadow-lg">
                                {[
                                  "Hafiz-ul-Quran",
                                  "Qari",
                                  "Alim / Alimah",
                                  "Mufti",
                                  "Mufassir", 
                                  "Muhaddith",
                                  "Ijazah (Sanad)",
                                  "Arabic Diploma",
                                  "Tajweed Certificate",
                                  "Other"
                                ].map(qual => (
                                  <SelectItem 
                                    key={qual} 
                                    value={qual}
                                    className="hover:bg-slate-100 cursor-pointer"
                                  >
                                    {qual}
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
                        name="instituteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Institute Name <span className="text-slate-400 font-normal">(Optional)</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g. Jamia Al-Kauthar, Wifaq-ul-Madaris" 
                                className="h-12 rounded-xl bg-white" 
                                {...field} 
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="experienceYears"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Years of Teaching Experience <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
                                step="1"
                                placeholder="e.g. 5" 
                                className="h-12 rounded-xl bg-white" 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                                value={field.value}
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground mt-1">
                              Enter total years of Quran teaching experience
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="demoClassAvailable"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Demo Class Available? <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-xl bg-white">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border border-slate-200 shadow-lg">
                                <SelectItem value="yes" className="hover:bg-slate-100 cursor-pointer">
                                  Yes - Available for demo session
                                </SelectItem>
                                <SelectItem value="no" className="hover:bg-slate-100 cursor-pointer">
                                  No - Not available
                                </SelectItem>
                                <SelectItem value="uponRequest" className="hover:bg-slate-100 cursor-pointer">
                                  Upon Request - Can arrange with notice
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground mt-1">
                              Demo classes help students evaluate your teaching style
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Section 5: Availability */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Availability</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <FormLabel className="text-slate-700 font-semibold text-base">
                          Days Available <span className="text-red-500">*</span>
                        </FormLabel>
                        <p className="text-sm text-muted-foreground mb-3">
                          Select all days you are available for teaching
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {WEEKDAYS.map((day) => (
                            <FormField
                              key={day}
                              control={form.control}
                              name="daysAvailable"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(day)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), day])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== day
                                                ) || []
                                              )
                                        }}
                                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-slate-300"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer text-slate-600">
                                      {day}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </div>

                      <div className="mt-6">
                        <FormLabel className="text-slate-700 font-semibold text-base">
                          Preferred Time Slots <span className="text-red-500">*</span>
                        </FormLabel>
                        <p className="text-sm text-muted-foreground mb-3">
                          Select all time slots you are available
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="preferredTimeMorning"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl bg-white">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="font-semibold cursor-pointer">
                                    Morning
                                  </FormLabel>
                                  <p className="text-xs text-muted-foreground">
                                    5:00 AM - 12:00 PM
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="preferredTimeAfternoon"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl bg-white">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="font-semibold cursor-pointer">
                                    Afternoon
                                  </FormLabel>
                                  <p className="text-xs text-muted-foreground">
                                    12:00 PM - 5:00 PM
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="preferredTimeEvening"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl bg-white">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </FormControl>
                                <div className="space-y-1">
                                  <FormLabel className="font-semibold cursor-pointer">
                                    Evening
                                  </FormLabel>
                                  <p className="text-xs text-muted-foreground">
                                    5:00 PM - 10:00 PM
                                  </p>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </div>
                  </section>

                  {/* Section 6: Expected Rate */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Expected Rate</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="ratePerHour"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Per Hour Rate <span className="text-slate-400 font-normal">(PKR)</span>
                            </FormLabel>
                            <div className="relative">
                              <span className="absolute left-3 top-3.5 text-slate-500">Rs.</span>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="0"
                                  placeholder="e.g. 500" 
                                  className="pl-12 h-12 rounded-xl bg-white" 
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your rate per hour of teaching
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ratePerMonth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                              Per Month Rate <span className="text-slate-400 font-normal">(PKR) - Optional</span>
                            </FormLabel>
                            <div className="relative">
                              <span className="absolute left-3 top-3.5 text-slate-500">Rs.</span>
                              <FormControl>
                                <Input 
                                  type="number"
                                  min="0"
                                  placeholder="e.g. 8000" 
                                  className="pl-12 h-12 rounded-xl bg-white" 
                                  {...field}
                                  value={field.value || ''}
                                />
                              </FormControl>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Monthly package rate (if applicable)
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Section 7: Short Bio */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-pink-50 p-2 rounded-lg text-pink-600">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Short Bio</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="shortBio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">
                            Tell us about yourself <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe your teaching style and experience. Parents connect emotionally here."
                              className="min-h-[120px] rounded-xl bg-white p-4"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">
                            2-3 lines recommended. Share your passion for teaching Quran and your approach with students.
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* Section 8: Confirmation */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="bg-amber-50 p-2 rounded-lg text-amber-600">
                        <Shield className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800">Confirmation</h2>
                    </div>

                    <FormField
                      control={form.control}
                      name="confirmAccuracy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl bg-slate-50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-primary mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-semibold text-slate-700 cursor-pointer">
                              I confirm that all provided information is accurate
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              By checking this box, you confirm that the information provided is true and correct to the best of your knowledge.
                            </p>
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
