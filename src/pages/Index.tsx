/* Home Page - Displays a greeting message in Portuguese. */
const Index = () => {
  return (
    <div className="flex flex-grow items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl animate-fade-in-up">
          Olá, Mundo!
        </h1>
        <p
          className="mt-4 text-lg text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Bem-vindo ao seu novo projeto.
        </p>
      </div>
    </div>
  )
}

export default Index
