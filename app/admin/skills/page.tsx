"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Plus, Edit, Trash2, Code, Palette, Database, Loader2 } from "lucide-react"
import { skillsService, Skill, SkillCategory, isSupabaseConfigured } from "@/lib/supabase-service"
import { useToast } from "@/hooks/use-toast"

export default function SkillsPage() {
  const [skillCategories, setSkillCategories] = useState<{ category: SkillCategory; skills: Skill[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    experience: "",
    category_id: ""
  })
  const { toast } = useToast()

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    setLoading(true)
    try {
      if (!isSupabaseConfigured()) {
        // Demo data for when Supabase is not configured
        setSkillCategories([
          {
            category: {
              id: "1",
              name: "Programming Languages",
              icon: "Code"
            },
            skills: [
              { id: "1", name: "JavaScript", level: 95, experience: "5+ years", category_id: "1" },
              { id: "2", name: "TypeScript", level: 90, experience: "3+ years", category_id: "1" },
              { id: "3", name: "Python", level: 85, experience: "4+ years", category_id: "1" }
            ]
          },
          {
            category: {
              id: "2",
              name: "Frontend Development",
              icon: "Palette"
            },
            skills: [
              { id: "4", name: "React", level: 95, experience: "4+ years", category_id: "2" },
              { id: "5", name: "Next.js", level: 90, experience: "3+ years", category_id: "2" }
            ]
          }
        ])
      } else {
        const data = await skillsService.getSkillsByCategory()
        setSkillCategories(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    if (!formData.name || !formData.category_id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      if (!isSupabaseConfigured()) {
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. This is a demo.",
          variant: "default"
        })
        return
      }

      const newSkill = await skillsService.createSkill(formData)
      if (newSkill) {
        await loadSkills()
        setIsCreateDialogOpen(false)
        resetForm()
        toast({
          title: "Success",
          description: "Skill created successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create skill",
        variant: "destructive"
      })
    }
  }

  const handleEdit = async () => {
    if (!editingSkill || !formData.name) return

    try {
      if (!isSupabaseConfigured()) {
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. This is a demo.",
          variant: "default"
        })
        return
      }

      const updatedSkill = await skillsService.updateSkill(editingSkill.id!, formData)
      if (updatedSkill) {
        await loadSkills()
        setIsEditDialogOpen(false)
        setEditingSkill(null)
        resetForm()
        toast({
          title: "Success",
          description: "Skill updated successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skill",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return

    try {
      if (!isSupabaseConfigured()) {
        toast({
          title: "Demo Mode",
          description: "Supabase not configured. This is a demo.",
          variant: "default"
        })
        return
      }

      const success = await skillsService.deleteSkill(id)
      if (success) {
        await loadSkills()
        toast({
          title: "Success",
          description: "Skill deleted successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      level: skill.level,
      experience: skill.experience,
      category_id: skill.category_id
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      level: 50,
      experience: "",
      category_id: ""
    })
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return Code
      case "Palette":
        return Palette
      case "Database":
        return Database
      default:
        return Award
    }
  }

  const getLevelColor = (level: number) => {
    if (level >= 90) return "bg-green-500"
    if (level >= 75) return "bg-blue-500"
    if (level >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getLevelText = (level: number) => {
    if (level >= 90) return "Expert"
    if (level >= 75) return "Advanced"
    if (level >= 60) return "Intermediate"
    return "Beginner"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage your technical skills and expertise</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={resetForm}>
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your expertise
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category *
                </Label>
                <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((cat) => (
                      <SelectItem key={cat.category.id} value={cat.category.id!}>
                        {cat.category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level ({formData.level}%)
                </Label>
                <Input
                  id="level"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 3+ years"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Add Skill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {skillCategories.map((categoryData) => {
          const IconComponent = getIconComponent(categoryData.category.icon || "Award")
          return (
            <Card key={categoryData.category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{categoryData.category.name}</CardTitle>
                      <CardDescription>{categoryData.skills.length} skills</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.skills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {skill.experience}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${
                            skill.level >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            skill.level >= 75 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            skill.level >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {getLevelText(skill.level)}
                          </Badge>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {skill.level}%
                          </span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => openEditDialog(skill)}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleDelete(skill.id!)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Update skill information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name *
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category *
              </Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map((cat) => (
                    <SelectItem key={cat.category.id} value={cat.category.id!}>
                      {cat.category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-level" className="text-right">
                Level ({formData.level}%)
              </Label>
              <Input
                id="edit-level"
                type="range"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-experience" className="text-right">
                Experience
              </Label>
              <Input
                id="edit-experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 3+ years"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Skill</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
