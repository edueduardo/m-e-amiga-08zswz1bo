import { Pie, PieChart, ResponsiveContainer } from 'recharts'
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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { EmotionalPattern } from '@/types'

interface EmotionDistributionPieChartProps {
  pattern: EmotionalPattern
}

export const EmotionDistributionPieChart = ({
  pattern,
}: EmotionDistributionPieChartProps) => {
  const chartData = pattern.data.labels.map((label, index) => ({
    name: label,
    value: pattern.data.values[index],
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  const chartConfig = pattern.data.labels.reduce((acc, label, index) => {
    acc[label] = {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    }
    return acc
  }, {} as any)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{pattern.title}</CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
