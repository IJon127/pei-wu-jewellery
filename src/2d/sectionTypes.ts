export type ModalKind = 'allProjects' | 'allExhibitions' | 'allPress' | 'project' | 'exhibition'

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

/** Full project copy for the single-project modal */
export interface ProjectDetail extends ProjectCard {
    description: string
    /** Gallery images in addition to `image` (main) */
    otherImages: string[]
}

export interface Exhibition {
    year: string
    title: string
    venue: string
    city: string
}

/** Full exhibition copy for the exhibition detail modal */
export interface ExhibitionDetail extends Exhibition {
    id: string
    description: string
    images: string[]
}

export interface PressEntry {
    pub: string
    quote: string
    date: string
}

export interface SectionProps {
    scrollTop: number
    align?: 'left' | 'center' | 'right'
    /** Second argument is `projectId` when kind is `project`, `exhibitionId` when kind is `exhibition` */
    onOpenModal?: (kind: ModalKind, id?: string) => void
}
