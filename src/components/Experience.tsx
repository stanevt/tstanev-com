type Role = {
  period: string
  title: string
  company: string
  location?: string
  description?: string
}

const roles: Role[] = [
  {
    period: "Feb 2024 — Now",
    title: "Automation Specialist & BA Lead",
    company: "Leeds Teaching Hospitals NHS Trust",
    location: "Leeds, UK",
    description:
      "Lead RPA initiatives across the Trust, designing and delivering automation solutions in Blue Prism that recover revenue and reduce waste. Own the product backlog, manage sprints, and produce process maps and cost-benefit analyses from concept through to deployment.",
  },
  {
    period: "Aug 2022 — Feb 2024",
    title: "Senior Business Analyst",
    company: "Leeds Teaching Hospitals NHS Trust",
    location: "Leeds, UK",
    description:
      "Led a year-long transformation of the Problems & Diagnosis pathway across all cancer departments, migrating 20 years of legacy data and ensuring COSD compliance. Delivered 50+ standalone projects digitising documents and redesigning clinical workflows.",
  },
  {
    period: "Sep 2021 — Aug 2022",
    title: "Business Analyst",
    company: "Leeds Teaching Hospitals NHS Trust",
    location: "Leeds, UK",
    description:
      "Created user stories and acceptance criteria for software implementations. Managed the team's Jira backlog and supported senior BAs on larger transformation projects.",
  },
  {
    period: "Jul 2019 — Sep 2021",
    title: "Developer",
    company: "Leeds Teaching Hospitals NHS Trust",
    location: "Leeds, UK",
    description:
      "Built automated workflows and electronic forms for the Electronic Health Record system. Developed a network monitoring stack with Telegraf, Grafana, and InfluxDB, and supported API development.",
  },
  {
    period: "Sep 2017 — Jun 2018",
    title: "Web Developer",
    company: "CareBig",
    location: "Leeds, UK",
    description:
      "Built a web application connecting users with freelance caregivers using the MERN stack, including a MySQL database for caregiver profiles.",
  },
]

type EducationEntry = {
  period: string
  degree: string
  institution: string
  location?: string
  detail?: string
}

const education: EducationEntry[] = [
  {
    period: "2021",
    degree: "BSc Computer Science — 2:1",
    institution: "University of Leeds",
    location: "Leeds, UK",
    detail: "Final Year Project: Improving the ChemoCare System of Leeds Teaching Hospitals NHS Trust",
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-foreground/30 mb-4 pt-6">
      {children}
    </p>
  )
}

export function Experience() {
  return (
    <div>
      <SectionLabel>Experience</SectionLabel>
      <div className="border-t border-foreground">
        {roles.map((role, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 border-b border-foreground/15 last:border-b-0 py-5"
          >
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em] text-foreground/40 pt-0.5">
              {role.period}
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-sans text-sm font-medium text-foreground">{role.title}</span>
                <span className="font-sans text-sm text-foreground/50">{role.company}</span>
                {role.location && (
                  <span className="font-sans text-xs text-foreground/30 tracking-[0.08em]">
                    {role.location}
                  </span>
                )}
              </div>
              {role.description && (
                <p className="mt-1 font-sans text-sm leading-relaxed text-foreground/55">
                  {role.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Education</SectionLabel>
      <div className="border-t border-foreground">
        {education.map((entry, i) => (
          <div
            key={i}
            className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-2 sm:gap-8 border-b border-foreground/15 last:border-b-0 py-5"
          >
            <p className="font-sans text-[0.7rem] font-medium uppercase tracking-[0.14em] text-foreground/40 pt-0.5">
              {entry.period}
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-sans text-sm font-medium text-foreground">{entry.degree}</span>
                <span className="font-sans text-sm text-foreground/50">{entry.institution}</span>
                {entry.location && (
                  <span className="font-sans text-xs text-foreground/30 tracking-[0.08em]">
                    {entry.location}
                  </span>
                )}
              </div>
              {entry.detail && (
                <p className="mt-1 font-sans text-sm leading-relaxed text-foreground/55">
                  {entry.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
