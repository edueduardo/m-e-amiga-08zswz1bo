import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Book, Clapperboard, Newspaper, Search } from 'lucide-react'
import { getDynamicLibraryResources } from '@/lib/data'
import { LibraryResource, LibraryResourceType } from '@/types'

const resourceTypeMap: Record<
  LibraryResourceType,
  { label: string; icon: React.ElementType }
> = {
  article: { label: 'Artigo', icon: Newspaper },
  video: { label: 'Vídeo', icon: Clapperboard },
  book: { label: 'Livro', icon: Book },
}

const topicMap: Record<string, string> = {
  all: 'Todos os Tópicos',
  mental_health: 'Saúde Mental',
  relationships: 'Relacionamentos',
  motherhood: 'Maternidade',
  personal_development: 'Desenvolvimento Pessoal',
}

const LibraryCard = ({ resource }: { resource: LibraryResource }) => {
  const Icon = resourceTypeMap[resource.type].icon
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-transform">
      <img
        src={resource.cover_image_url}
        alt={resource.title}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon className="h-4 w-4" />
            <span>{resourceTypeMap[resource.type].label}</span>
          </div>
          <span>{topicMap[resource.topic]}</span>
        </div>
        <CardTitle className="mt-2">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{resource.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Acessar Recurso
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [dynamicContent, setDynamicContent] = useState<{
    resources: LibraryResource[]
    topics: string[]
  }>({ resources: [], topics: [] })

  useEffect(() => {
    // Simulates content refreshing every 12 hours by refreshing on component mount
    setDynamicContent(getDynamicLibraryResources())
  }, [])

  const filteredResources = dynamicContent.resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic =
      selectedTopic === 'all' || resource.topic === selectedTopic
    return matchesSearch && matchesTopic
  })

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Biblioteca de Recursos</h1>
        <p className="text-muted-foreground mt-1">
          Artigos, vídeos e livros selecionados com carinho para você. Os temas
          são atualizados a cada 12 horas.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou descrição..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Filtrar por tópico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{topicMap.all}</SelectItem>
            {dynamicContent.topics.map((topicKey) => (
              <SelectItem key={topicKey} value={topicKey}>
                {topicMap[topicKey]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <LibraryCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}

export default LibraryPage
