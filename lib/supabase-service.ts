import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions
export interface Project {
  id?: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'planning'
  tech: string[]
  featured: boolean
  image_url?: string
  github_url?: string
  live_url?: string
  created_at?: string
  updated_at?: string
}

export interface Message {
  id?: string
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  priority: 'high' | 'medium' | 'low'
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id?: string
  name: string
  level: number
  experience: string
  category_id: string
  created_at?: string
  updated_at?: string
}

export interface SkillCategory {
  id?: string
  name: string
  icon: string
  created_at?: string
  updated_at?: string
}

export interface Service {
  id?: string
  title: string
  description: string
  price: string
  duration: string
  technologies: string[]
  featured: boolean
  active: boolean
  icon: string
  created_at?: string
  updated_at?: string
}

export interface Experience {
  id?: string
  company: string
  position: string
  type: 'full-time' | 'part-time' | 'freelance' | 'contract'
  location: string
  start_date: string
  end_date: string | null
  current: boolean
  description: string
  technologies: string[]
  achievements: string[]
  created_at?: string
  updated_at?: string
}

export interface Education {
  id?: string
  institution: string
  degree: string
  field: string
  location: string
  start_date: string
  end_date: string
  gpa?: string
  status: 'completed' | 'in-progress' | 'paused'
  description: string
  courses: string[]
  achievements: string[]
  created_at?: string
  updated_at?: string
}

// Projects CRUD
export const projectsService = {
  async getAll(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  },

  async getById(id: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  },

  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  },

  async update(id: string, project: Partial<Project>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  }
}

// Messages CRUD
export const messagesService = {
  async getAll(): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching messages:', error)
      return []
    }
  },

  async updateStatus(id: string, status: Message['status']): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating message status:', error)
      return false
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting message:', error)
      return false
    }
  }
}

// Skills CRUD
export const skillsService = {
  async getCategories(): Promise<SkillCategory[]> {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching skill categories:', error)
      return []
    }
  },

  async getSkillsByCategory(): Promise<{ category: SkillCategory; skills: Skill[] }[]> {
    try {
      const { data, error } = await supabase
        .from('skill_categories')
        .select(`
          *,
          skills:skills(*)
        `)
        .order('name')
      
      if (error) throw error
      return data?.map(category => ({
        category: {
          id: category.id,
          name: category.name,
          icon: category.icon,
          created_at: category.created_at,
          updated_at: category.updated_at
        },
        skills: category.skills || []
      })) || []
    } catch (error) {
      console.error('Error fetching skills:', error)
      return []
    }
  },

  async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill | null> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert([skill])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating skill:', error)
      return null
    }
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill | null> {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skill)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating skill:', error)
      return null
    }
  },

  async deleteSkill(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting skill:', error)
      return false
    }
  }
}

// Services CRUD
export const servicesService = {
  async getAll(): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching services:', error)
      return []
    }
  },

  async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating service:', error)
      return null
    }
  },

  async update(id: string, service: Partial<Service>): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(service)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating service:', error)
      return null
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting service:', error)
      return false
    }
  }
}

// Experience CRUD
export const experienceService = {
  async getAll(): Promise<Experience[]> {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching experience:', error)
      return []
    }
  },

  async create(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<Experience | null> {
    try {
      const { data, error } = await supabase
        .from('experience')
        .insert([experience])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating experience:', error)
      return null
    }
  },

  async update(id: string, experience: Partial<Experience>): Promise<Experience | null> {
    try {
      const { data, error } = await supabase
        .from('experience')
        .update(experience)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating experience:', error)
      return null
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting experience:', error)
      return false
    }
  }
}

// Education CRUD
export const educationService = {
  async getAll(): Promise<Education[]> {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('start_date', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching education:', error)
      return []
    }
  },

  async create(education: Omit<Education, 'id' | 'created_at' | 'updated_at'>): Promise<Education | null> {
    try {
      const { data, error } = await supabase
        .from('education')
        .insert([education])
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating education:', error)
      return null
    }
  },

  async update(id: string, education: Partial<Education>): Promise<Education | null> {
    try {
      const { data, error } = await supabase
        .from('education')
        .update(education)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating education:', error)
      return null
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting education:', error)
      return false
    }
  }
}

// Utility function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseKey && supabaseUrl !== '' && supabaseKey !== '')
}
