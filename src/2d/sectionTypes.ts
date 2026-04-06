import type { PortfolioData } from './services/sheetApi';

export type ModalKind = 'allProjects' | 'allExhibitions' | 'allPress' | 'project' | 'exhibition' | 'allBespoke' | 'bespoke'

export interface PortfolioItem {
    id: string
    title: string
    year: string
    date: string
    type: string
    material: string
    size: string
    introduction: string
    description: string
    city: string
    venue: string
    image: string
    images: string[]
    photoby: string[]
    illustration?: string
    link?: string
}


export interface SectionProps {
    scrollTop: number
    align?: 'left' | 'center' | 'right'
    portfolioData?: PortfolioData
    /** Second argument is `projectId` when kind is `project`, `exhibitionId` when kind is `exhibition` */
    onOpenModal?: (kind: ModalKind, id?: string) => void
}
