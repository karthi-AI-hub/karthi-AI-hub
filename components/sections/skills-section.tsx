"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Smartphone, Server, Database, Cloud, Settings, Zap } from "lucide-react"
import Image from "next/image"

interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  icon_url?: string
}

interface SkillsSectionProps {
  skills: Skill[]
}

const skillCategories = [
  {
    id: "Frontend",
    label: "Frontend",
    color: "from-blue-500 to-cyan-500",
    icon: Code2,
    description: "Modern web interfaces",
  },
  {
    id: "Mobile",
    label: "Mobile",
    color: "from-green-500 to-emerald-500",
    icon: Smartphone,
    description: "Cross-platform apps",
  },
  {
    id: "Backend",
    label: "Backend",
    color: "from-purple-500 to-violet-500",
    icon: Server,
    description: "Server-side solutions",
  },
  {
    id: "Database",
    label: "Database",
    color: "from-orange-500 to-red-500",
    icon: Database,
    description: "Data management",
  },
  {
    id: "Cloud",
    label: "Cloud",
    color: "from-cyan-500 to-blue-500",
    icon: Cloud,
    description: "Cloud platforms",
  },
  {
    id: "DevOps",
    label: "DevOps",
    color: "from-red-500 to-pink-500",
    icon: Settings,
    description: "Development operations",
  },
]

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("Frontend")

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium">
              <Zap className="inline w-4 h-4 mr-2" />
              Technical Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital
            experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            {/* Enhanced Tab List */}
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent p-2 rounded-2xl border-0">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <TabsTrigger
                      value={category.id}
                      className="relative flex flex-col items-center p-4 rounded-xl text-sm font-medium transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg group"
                      data-cursor="pointer"
                    >
                      <category.icon className="w-5 h-5 mb-1 group-data-[state=active]:text-white" />
                      <span className="hidden sm:block">{category.label}</span>
                      <span className="sm:hidden text-xs">{category.label.slice(0, 3)}</span>
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full text-sm font-medium shadow-lg`}
                  >
                    <category.icon className="w-4 h-4" />
                    {category.description}
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {groupedSkills[category.id]?.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 120,
                        damping: 15
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className="group cursor-pointer"
                      data-cursor="pointer"
                    >
                      <div className="relative h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                        {/* Gradient Border Effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                        />

                        {/* Skill Content */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                            {skill.icon_url ? (
                              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl p-3 flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                                <Image
                                  src={skill.icon_url}
                                  alt={`${skill.name} icon`}
                                  width={40}
                                  height={40}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    // Fallback to category icon if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement?.parentElement;
                                    if (parent) {
                                      parent.className = `w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl p-3 flex items-center justify-center shadow-md`;
                                      const fallbackIcon = document.createElement('div');
                                      fallbackIcon.innerHTML = `<svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.64 9 11 5.16-1.36 9-5.45 9-11V7l-10-5z"/></svg>`;
                                      parent.appendChild(fallbackIcon);
                                    }
                                  }}
                                />
                              </div>
                            ) : (
                              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl p-3 flex items-center justify-center shadow-md`}>
                                <category.icon className="w-10 h-10 text-white" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  )) || (
                    <div className="col-span-full text-center py-12">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-slate-500 dark:text-slate-400"
                      >
                        <category.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No skills found in this category</p>
                      </motion.div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Skills Summary with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "15+", label: "Technologies", color: "from-blue-500 to-cyan-500", icon: "🚀" },
              { number: "5+", label: "Mobile Apps", color: "from-green-500 to-emerald-500", icon: "📱" },
              { number: "20+", label: "Projects", color: "from-purple-500 to-violet-500", icon: "💼" },
              { number: "3+", label: "Years Exp", color: "from-orange-500 to-red-500", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group cursor-pointer"
                data-cursor="pointer"
              >
                <div
                  className={`relative bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full"
                  />
                  <div className="relative z-10 text-center">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <motion.div className="text-3xl font-bold mb-2" whileHover={{ scale: 1.1 }}>
                      {stat.number}
                    </motion.div>
                    <div className="text-white/90 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  )
}
