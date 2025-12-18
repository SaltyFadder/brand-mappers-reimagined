import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { MapPin, Clock, Bus, Mail, Phone, Briefcase, GraduationCap, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    id: 1,
    title: "International Sales Specialist (English Only)",
    icon: Briefcase,
    location: "Maadi, Egypt (In office)",
    schedule: "Monday to Friday, Night Shift 7PM-4AM",
    summary: "We are hiring an International Sales Specialist for our Client Heritage College Canada.",
    responsibilities: [
      "Researching, prospecting, and establishing leads via direct phone contact, emails and text messages",
      "Presenting the opportunities of attending the College",
      "Qualify leads and develops progressive strategies to close new and existing business in a timely manner",
      "Collaborate with internal College departments on partner-related opportunities",
      "Accountable for achieving established sales targets/goals",
      "Administrative duties and support as required",
      "Providing sales and product information on programs and offerings",
      "Maintaining records to contribute to the administrative functions of the campus",
      "Achieving monthly and annual sales targets",
      "Driving the recruitment efforts pertaining to admissions in the school"
    ],
    qualifications: [
      "Bachelor's degree in business or related field",
      "Excellent English communication skills verbal, written and listening",
      "A minimum of 3 years of Tele sales performance history",
      "Exceptional Technical skills with Microsoft office Suites",
      "Highly organized with attention to detail",
      "Professional and flexible attitude with a passion for helping others",
      "Ability to create and nurture relationships with customers through social selling",
      "Clear Criminal Background"
    ],
    benefits: ["Full-time", "Medical Insurance", "Door-to-door transportation"]
  },
  {
    id: 2,
    title: "Learning Management System Administrator (Moodle)",
    icon: Settings,
    location: "Maadi, Egypt (In office)",
    schedule: "Monday to Friday, Night Shift 7PM-4AM",
    summary: "We are hiring a Moodle Distance Learning Coordinator for our Client Heritage College Canada.",
    responsibilities: [
      "Deliver training materials via live facilitation, online facilitation, or distributed/distance learning",
      "Revise modes of assessment to measure the effectiveness of the course",
      "Evaluate and improve training programs and materials as required",
      "Create and integrate interactive elements into online and blended programs",
      "Provide support to the instructional design team",
      "Deliver training/orientation sessions to new/existing students about how to use the LMS system",
      "Ensure lectures, lessons, exams, and live sessions are updated in a timely manner on LMS (MOODLE)",
      "Design, develop, revise, and maintain existing training programs",
      "Recommend cost-effective training plans",
      "Maintain communication links at all levels through projects"
    ],
    qualifications: [
      "Degree in Adult Education or related discipline; Master of Distance Learning highly Preferred",
      "1-2 years of training experience, including online course design",
      "Demonstrated knowledge of adult distance learning principles",
      "Proficient with Microsoft 365 applications, Video editing, recording",
      "Experience with Adobe InDesign and/or Photoshop an asset",
      "Experience in Moodle is required",
      "Exceptional English oral and written communication skills",
      "Organized and has a keen eye for details"
    ],
    benefits: ["Full-time contract", "Competitive compensation", "Door-to-door transportation"]
  },
  {
    id: 3,
    title: "Education Assistant",
    icon: GraduationCap,
    location: "Maadi, Egypt (In office)",
    schedule: "Monday to Friday, Night Shift 7PM-4AM",
    summary: "We are hiring an Education Assistant for our Client Heritage College Canada.",
    responsibilities: [
      "Manage campus operations and provide support to the Academic Manager",
      "Assist in the implementation and planning of Individual Education Programs for students",
      "Maintain The LMS system with students' information and course contents",
      "Adhere to the college policies and ensure adherence by faculty and students",
      "Assist in the development of the future plans for new cohorts, programs, and courses",
      "Support faculty in their requests and assist them in course delivery",
      "Assist in handling students' complaints and address them in a timely manner",
      "Maintain the college inventory of equipment",
      "Attend all monthly instructor meetings and take minutes"
    ],
    qualifications: [
      "Bachelor's Degree or equivalent required",
      "Excellent communication skills in English written and verbal",
      "Advanced experience in online learning and distance learning platforms (Moodle preferred)",
      "Excellent organizational ability/time management",
      "Strong technology interest and ability",
      "Evidence of innovation and creativity",
      "Previous one year education coordination experience is a must"
    ],
    benefits: ["Full-time", "Door-to-door transportation"]
  },
  {
    id: 4,
    title: "Practicum Coordinator",
    icon: Users,
    location: "Maadi, Egypt (In office)",
    schedule: "Monday to Friday, Night Shift 7PM-4AM",
    summary: "We are hiring a Practicum Coordinator for our Client Heritage College Canada.",
    responsibilities: [
      "Develop and maintain relationships with Canadian businesses to secure practicum opportunities",
      "Collaborate with academic staff to align practicum placements with curriculum requirements",
      "Match students with appropriate practicum placements based on their skills and career goals",
      "Monitor student progress during practicums and provide support as needed",
      "Ensure all practicum documentation and compliance requirements are met",
      "Offer one-on-one career counseling sessions to students and graduates",
      "Conduct workshops on resume writing, interview preparation, and job search strategies",
      "Build and maintain relationships with employers to identify job openings",
      "Assist in organizing virtual career fairs and networking events",
      "Track employment outcomes and provide reports on placement success rates"
    ],
    qualifications: [
      "Bachelor's degree in Education, Business, Human Resources, or a related field",
      "Minimum of 3 years' experience in career services, recruitment, or a related area",
      "Strong understanding of the Canadian job market and employer expectations",
      "Excellent communication and interpersonal skills",
      "Proficient in using digital tools and platforms for remote coordination"
    ],
    benefits: ["Full-time", "Door-to-door transportation"]
  }
];

const Careers = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="section-padding max-w-[1400px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Join Our Team
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              We Are <span className="text-gradient">Looking For You</span>
            </h1>
            <p className="text-foreground/70 text-lg md:text-xl mb-8">
              Join Brand Mappers Phonomena and work with Heritage College Canada
            </p>
            
            {/* Important Note */}
            <div className="glass p-6 rounded-2xl text-left max-w-2xl mx-auto">
              <h3 className="font-display font-semibold text-lg mb-3 text-primary">Important Note</h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>All positions are Night Shift: 7PM - 4AM</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Location: Maadi Branch, Cairo</span>
                </li>
                <li className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Door-to-door transportation provided</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Job Listings */}
      <section className="section-padding py-20">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Open <span className="text-gradient">Positions</span>
          </h2>
          
          <div className="space-y-8">
            {jobs.map((job) => (
              <div key={job.id} className="glass rounded-2xl p-8 card-hover">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <job.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3">{job.title}</h3>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.schedule}
                      </span>
                    </div>
                    
                    <p className="text-foreground/80 mb-6">{job.summary}</p>
                    
                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className="font-display font-semibold mb-3">Responsibilities</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {job.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Qualifications */}
                    <div className="mb-6">
                      <h4 className="font-display font-semibold mb-3">Qualifications</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {job.qualifications.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Benefits */}
                    <div className="flex flex-wrap gap-2">
                      {job.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Apply Section */}
      <section className="section-padding py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Apply?</span>
            </h2>
            <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
              Send your CV to join our team and start your journey with Heritage College Canada
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="mailto:mohamad.abdelrahman@heritage-college.ca"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full"
              >
                <Mail className="w-5 h-5" />
                Apply Now
              </a>
              <a
                href="tel:01003323458"
                className="btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-full"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
            
            <div className="text-foreground/60 text-sm">
              <p className="mb-1">
                <strong>Email:</strong>{" "}
                <a href="mailto:mohamad.abdelrahman@heritage-college.ca" className="text-primary hover:underline">
                  mohamad.abdelrahman@heritage-college.ca
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:01003323458" className="text-primary hover:underline">
                  01003323458
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Careers;
