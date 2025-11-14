import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { weeklySummary } from '@/lib/data'
import { CalendarHeart } from 'lucide-react'

const SummaryPage = () => {
  const chartData = Object.entries(weeklySummary.mood_overview).map(
    ([mood, value]) => ({
      mood,
      value,
    }),
  )

  const chartConfig = {
    value: {
      label: 'Dias',
      color: 'hsl(var(--chart-1))',
    },
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <CalendarHeart className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Resumo da sua Semana
        </h1>
        <p className="text-muted-foreground mt-2">
          Um olhar carinhoso sobre sua jornada de {weeklySummary.start_date} a{' '}
          {weeklySummary.end_date}.
        </p>
      </div>
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>Visão Geral das Emoções</CardTitle>
          <CardDescription>
            Como você se sentiu na última semana.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} accessibilityLayer>
                <XAxis
                  dataKey="mood"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card
        className="bg-primary/10 border-primary animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        <CardHeader>
          <CardTitle>Uma palavrinha da Mãe Amiga</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: weeklySummary.summary_text }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryPage
