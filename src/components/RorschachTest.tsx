import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface RorschachTestProps {
  question: string
  imageUrl: string
  value: string
  onChange: (value: string) => void
}

export const RorschachTest = ({
  question,
  imageUrl,
  value,
  onChange,
}: RorschachTestProps) => {
  return (
    <div className="space-y-4 text-center">
      <Label className="text-lg block">{question}</Label>
      <Card className="overflow-hidden">
        <CardContent className="p-2">
          <AspectRatio ratio={1 / 1}>
            <img
              src={imageUrl}
              alt="Rorschach inkblot test"
              className="rounded-md object-contain h-full w-full"
            />
          </AspectRatio>
        </CardContent>
      </Card>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Descreva o que você vê ou sente..."
        rows={5}
      />
    </div>
  )
}
