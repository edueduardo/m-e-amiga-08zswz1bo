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
import { EmotionalPattern } from '@/types'

interface EmotionOverTimeChartProps {
  pattern: EmotionalPattern
}

export const EmotionOverTimeChart = ({
  pattern,
}: EmotionOverTimeChartProps) => {
  const chartData = pattern.data.labels.map((label, index) => ({
    label,
    value: pattern.data.values[index],
  }))

  const chartConfig = {
    value: {
      label: 'Intensidade',
      color: 'hsl(var(--chart-2))',
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pattern.title}</CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} accessibilityLayer>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis hide />
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
  )
}
