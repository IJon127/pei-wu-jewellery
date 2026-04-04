export type SectionDetailKind = 'projects' | 'exhibitions' | 'press'

export interface ProjectCard {
    id: string
    title: string
    year: string
    image: string
    /** CSS aspect-ratio value, e.g. '3/4', '1/1', '4/3' */
    aspectRatio?: string
    /** Card width as a fraction of its grid column, 0–1 */
    width?: number
    /** Horizontal nudge in px — positive shifts right */
    xOffset?: number
    /** Vertical nudge in px — positive shifts down */
    yOffset?: number
}

export interface Exhibition {
    year: string
    title: string
    venue: string
    city: string
}

export interface PressEntry {
    pub: string
    quote: string
    date: string
}

export interface SectionProps {
    scrollTop: number
    align?: 'left' | 'center' | 'right'
    onOpenDetail?: (kind: SectionDetailKind) => void
}
