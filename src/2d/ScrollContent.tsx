import React, { useCallback, useEffect, useState } from 'react'
import { StatementSection } from './sections/StatementSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ExhibitionsSection } from './sections/ExhibitionsSection'
import { PressSection } from './sections/PressSection'
import { BespokeSection } from './sections/BespokeSection'
import { NewsSection } from './sections/NewsSection'
import { AboutSection } from './sections/AboutSection'
import { Modal } from './Modal'
import type { ModalKind, SectionProps } from './sectionTypes'

/**
 * Total height of one cycle in vh.
 * This should match document.body.style.minHeight set in App.tsx.
 */
export const CYCLE_VH = 3240

/**
 * Adjust scrollTop (in vh) to control when each section appears
 * within one cycle of the 3240vh scrollable space.
 */
export type {
    Exhibition,
    ExhibitionDetail,
    PressEntry,
    ProjectCard,
    ProjectDetail,
    ModalKind,
    SectionProps,
} from './sectionTypes'

const SECTION_CONFIG: Array<{ component: React.ComponentType<SectionProps>; scrollTop: number; align?: SectionProps['align'] }> = [
    { component: StatementSection, scrollTop: 160, align: 'center' },
    { component: ProjectsSection, scrollTop: 590, align: 'left' },
    { component: ExhibitionsSection, scrollTop: 1200, align: 'right' },
    { component: PressSection, scrollTop: 1700, align: 'left' },
    { component: BespokeSection, scrollTop: 2100, align: 'left' },
    { component: NewsSection, scrollTop: 2790, align: 'center' },
    { component: AboutSection, scrollTop: 3070, align: 'center' },
]

/** How many cycles to seed on first render */
const INITIAL_CYCLES = 3

interface ScrollContentProps {
    visible: boolean
}

export function ScrollContent({ visible }: ScrollContentProps) {
    const [cycles, setCycles] = useState(INITIAL_CYCLES)
    const [modalKind, setModalKind] = useState<ModalKind | null>(null)
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
    const [selectedExhibitionId, setSelectedExhibitionId] = useState<string | null>(null)
    const [selectedBespokeId, setSelectedBespokeId] = useState<string | null>(null)

    const onOpenModal = useCallback((kind: ModalKind, id?: string) => {
        setModalKind(kind)
        if (kind === 'project') {
            setSelectedProjectId(id ?? null)
            setSelectedExhibitionId(null)
            setSelectedBespokeId(null)
        } else if (kind === 'exhibition') {
            setSelectedExhibitionId(id ?? null)
            setSelectedProjectId(null)
            setSelectedBespokeId(null)
        } else if (kind === 'bespoke') {
            setSelectedBespokeId(id ?? null)
            setSelectedProjectId(null)
            setSelectedExhibitionId(null)
        } else {
            setSelectedProjectId(null)
            setSelectedExhibitionId(null)
            setSelectedBespokeId(null)
        }
    }, [])

    const onCloseDetail = useCallback(() => {
        setModalKind(null)
        setSelectedProjectId(null)
        setSelectedExhibitionId(null)
        setSelectedBespokeId(null)
    }, [])

    useEffect(() => {
        if (!visible) {
            setModalKind(null)
            setSelectedProjectId(null)
            setSelectedExhibitionId(null)
            setSelectedBespokeId(null)
        }
    }, [visible])

    // Grow body and cycle count as user approaches the end
    useEffect(() => {
        if (!visible) return

        const onScroll = () => {
            const cycleHeightPx = CYCLE_VH * window.innerHeight / 100
            const cyclesPassed = Math.floor(window.scrollY / cycleHeightPx)
            if (cyclesPassed >= cycles - 1) {
                const next = cycles + 2
                setCycles(next)
                document.body.style.minHeight = `${next * CYCLE_VH}vh`
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [visible, cycles])

    if (!visible) return null

    return (
        <div className="scroll-content">
            {Array.from({ length: cycles }).map((_, cycleIndex) =>
                SECTION_CONFIG.map(({ component: SectionComp, scrollTop, align }, i) => (
                    <SectionComp
                        key={`${cycleIndex}-${i}`}
                        scrollTop={scrollTop + cycleIndex * CYCLE_VH}
                        align={align}
                        onOpenModal={onOpenModal}
                    />
                ))
            )}
            <Modal
                kind={modalKind}
                selectedProjectId={selectedProjectId}
                selectedExhibitionId={selectedExhibitionId}
                selectedBespokeId={selectedBespokeId}
                onClose={onCloseDetail}
                onOpenModal={onOpenModal}
            />
        </div>
    )
}
