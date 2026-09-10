import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a numeric amount using the Peruvian sol currency format.
 *
 * @param value - Amount to format.
 * @returns Amount prefixed with `S/.` and localized for Peru.
 */
export function formatPeruvianSoles(value: number): string {
  return `S/.${value.toLocaleString('es-PE', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`
}
