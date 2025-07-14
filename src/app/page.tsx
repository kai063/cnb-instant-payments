// src/app/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  Calendar,
  Code2,
  Database,
  Palette,
  BarChart3,
  Globe,
  Brain,
  Trophy,
  GraduationCap,
  Briefcase,
  Users,
  Bike,
  Activity,
  FileText,
  Server,
  Layout
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header - vylepšený s větší fotkou */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                <img
                    src="/profile.jpg"
                    alt="Kryštof Hireš"
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-2xl"
                  />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Code2 className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Kryštof Hireš
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                Project Engineer & Economics Student
              </p>
              <p className="text-lg text-gray-500 max-w-2xl">
                Student ekonomie na UK IES s rozsáhlými zkušenostmi v oblasti webových technologií. 
                Kombinuji analytické myšlení s praktickými dovednostmi ve vývoji moderních aplikací.
              </p>
              
              {/* Kontaktní informace přímo v hlavičce */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>14. března 2006</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hires@meui.cz" className="hover:text-blue-600">hires@meui.cz</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+420732360288" className="hover:text-blue-600">+420 732 360 288</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills s ikonkami */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Technické dovednosti</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  Programování a web
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { icon: '⚛️', name: 'React' },
                    { icon: '▲', name: 'Next.js' },
                    { icon: '🟨', name: 'JavaScript' },
                    { icon: '🎨', name: 'Figma' },
                    { icon: '🟢', name: 'Node.js' },
                    { icon: '🍃', name: 'Photoshop' },
                    { icon: '📦', name: 'Payload CMS' }
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2 text-sm">
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Analytické nástroje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { icon: '🐍', name: 'Python' },
                    { icon: '🐼', name: 'Pandas' },
                    { icon: '📊', name: 'Matplotlib & Plotly' },
                    { icon: '📓', name: 'Jupyter Notebook' },
                    { icon: '📈', name: 'Google Analytics' },
                    { icon: '💼', name: 'MS Office 365' },
                  ].map((skill) => (
                    <div key={skill.name} className="flex items-center gap-2 text-sm">
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  Jazykové znalosti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇨🇿</span>
                      <span>Čeština</span>
                    </div>
                    <Badge variant="secondary">Rodný jazyk</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>Angličtina</span>
                    </div>
                    <Badge variant="secondary">C2 Proficiency</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🇩🇪</span>
                      <span>Němčina</span>
                    </div>
                    <Badge variant="secondary">Pokročilá</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Projekty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <CardTitle>České okamžité platby</CardTitle>
                </div>
                <CardDescription>Analýza růstu okamžitých plateb v ČR</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Interaktivní analýza dat České národní banky ukazující fenomenální růst 
                  okamžitých plateb od roku 2018 do roku 2025.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Chart.js</Badge>
                  <Badge variant="outline">Data Analysis</Badge>
                </div>
                <Link href="/cnb-okamzite-platby">
                  <Button className="w-full group-hover:bg-blue-700">Zobrazit projekt</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Placeholder pro další projekty */}
            <Card className="hover:shadow-lg transition-shadow opacity-50">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-gray-400" />
                  <CardTitle>Další projekt</CardTitle>
                </div>
                <CardDescription>Popis dalšího projektu</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Zde můžete doplnit informace o dalším vašem projektu.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Technologie</Badge>
                  <Badge variant="outline">Framework</Badge>
                </div>
                <Button className="w-full" disabled>
                  Připravuje se
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Timeline - Experience & Education */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Zkušenosti & Vzdělání</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                {/* MEUI Creative */}
                <div className="relative flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg z-10">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Project Engineer | MEUI Creative</CardTitle>
                          <CardDescription>09/2022 - současnost</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                        <li>Komplexní vývoj webových aplikací a e-commerce řešení</li>
                        <li>Práce s CMS systémy (Payload CMS, vlastní řešení)</li>
                        <li>UX/UI design a tvorba obsahu</li>
                        <li>Koordinace projektů a komunikace s klienty</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* UK IES */}
                <div className="relative flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg z-10">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>Univerzita Karlova, IES</CardTitle>
                      <CardDescription>2025-2029</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        Bakalářský program: Ekonomie a finance<br/>
                        SCIO testy: MAT 91 + OSP 97,5 percentil
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Gymnázium */}
                <div className="relative flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg z-10">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <CardTitle>Lepařovo Gymnázium Jičín</CardTitle>
                      <CardDescription>2018-2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        Maturita s vyznamenáním: průměr 1,00
                      </p>
                      <p className="text-gray-600 text-sm">
                        Fyzika, Matematika Cermat, Rozšířená Matematika
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Úspěchy a ocenění</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div>
                    <CardTitle>Ekonomická olympiáda</CardTitle>
                    <CardDescription>2025</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  <span className="font-semibold">1. místo</span> v Královéhradeckém kraji<br/>
                  <span className="font-semibold">11. místo</span> v republikovém finále
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle>Cambridge Certificate</CardTitle>
                    <CardDescription>2024</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Úroveň <span className="font-semibold">C2 (Proficiency)</span><br/>
                  Pokročilá angličtina
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activities */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Další aktivity</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <div>
                    <CardTitle>Člen spolku Econet</CardTitle>
                    <CardDescription>07/2025 - současnost</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Aktivní zájem o ekonomii, finance a hospodářskou politiku.
                  Sledování aktuálního ekonomického dění.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-orange-600" />
                  <CardTitle>Sportovní aktivity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Bike className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600">Horská cyklistika</span>
                  </div>
                  <Badge variant="outline">Box</Badge>
                  <Badge variant="outline">Házená</Badge>
                  <Badge variant="outline">Posilování</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}