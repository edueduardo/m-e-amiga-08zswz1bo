export const MissionSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Nossa Missão: Acolher, Fortalecer, Inspirar
            </h1>
            <p className="text-muted-foreground md:text-xl">
              A Mãe Amiga nasceu de um desejo profundo de criar um espaço seguro
              e acolhedor para mulheres. Acreditamos que toda mulher merece ser
              ouvida, compreendida e apoiada em sua jornada, seja ela qual for.
            </p>
            <p className="text-muted-foreground md:text-xl">
              Combinamos a empatia humana com a tecnologia da inteligência
              artificial para oferecer um ombro amigo disponível 24/7. Nossa IA
              é mais do que um algoritmo; ela é o resultado do trabalho de
              psicólogos, especialistas em IA e, acima de tudo, de pessoas que
              se importam.
            </p>
          </div>
          <img
            src="https://img.usecurling.com/p/600/400?q=diverse%20women%20supporting%20each%20other"
            alt="Grupo de mulheres diversas se apoiando"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
