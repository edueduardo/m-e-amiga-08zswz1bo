import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export const ContactProfessionalsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Precisa de um Acolhimento Humano?
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Embora nossa IA seja treinada para ser empática, entendemos que às
            vezes a conexão humana é insubstituível. Se você deseja saber mais
            sobre opções de atendimento com profissionais de psicologia, entre
            em contato conosco.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Falar com nossa equipe</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
