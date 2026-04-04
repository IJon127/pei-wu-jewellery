export type SectionDetailKind = 'projects' | 'exhibitions' | 'press'

export interface SectionProps {
    scrollTop: number
    align?: 'left' | 'center' | 'right'
    onOpenDetail?: (kind: SectionDetailKind) => void
}
