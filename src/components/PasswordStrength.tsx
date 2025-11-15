import { CheckCircle2, XCircle } from 'lucide-react'

interface PasswordStrengthProps {
  password?: string
}

const PasswordRequirement = ({
  isValid,
  text,
}: {
  isValid: boolean
  text: string
}) => (
  <div
    className={`flex items-center text-sm ${isValid ? 'text-green-600' : 'text-muted-foreground'}`}
  >
    {isValid ? (
      <CheckCircle2 className="h-4 w-4 mr-2" />
    ) : (
      <XCircle className="h-4 w-4 mr-2" />
    )}
    {text}
  </div>
)

export const PasswordStrength = ({ password = '' }: PasswordStrengthProps) => {
  const hasLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    <div className="space-y-1 mt-2">
      <PasswordRequirement isValid={hasLength} text="Pelo menos 8 caracteres" />
      <PasswordRequirement
        isValid={hasUpperCase && hasLowerCase}
        text="Letras maiúsculas e minúsculas"
      />
      <PasswordRequirement isValid={hasNumber} text="Pelo menos um número" />
      <PasswordRequirement
        isValid={hasSpecialChar}
        text="Pelo menos um caractere especial"
      />
    </div>
  )
}
