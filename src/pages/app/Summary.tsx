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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resumo Semanal</h1>
        <p className="text-muted-foreground">
          Resumo da semana de {weeklySummary.start_date} a{' '}
          {weeklySummary.end_date}
        </p>
      </div>
      <Card>
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
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="var(--color-value)" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-primary/10 border-primary">
        <CardHeader>
          <CardTitle>Uma palavrinha da Mãe Amiga</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: weeklySummary.summary_text }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryPage
