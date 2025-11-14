const stats = [
  { value: '92%', label: 'das usuárias relatam sentir-se mais acolhidas' },
  { value: '10k+', label: 'mulheres já fazem parte da nossa comunidade' },
  { value: '24/7', label: 'de apoio emocional incondicional' },
]

const logos = [
  { name: 'Vogue', query: 'vogue%20logo' },
  { name: 'Forbes', query: 'forbes%20logo' },
  { name: 'Elle', query: 'elle%20logo' },
  { name: 'Marie Claire', query: 'marie%20claire%20logo' },
  { name: 'Glamour', query: 'glamour%20logo' },
]

export const SocialProofSection = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tighter text-muted-foreground">
            Junte-se a milhares de mulheres que encontraram seu espaço de
            acolhimento
          </h2>
        </div>
        <div className="divide-y rounded-lg border md:divide-y-0 md:divide-x md:grid md:grid-cols-3 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 text-center">
              <p className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            Como visto em
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={`https://img.usecurling.com/i?q=${logo.query}&color=gray`}
                alt={logo.name}
                className="h-8 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
