import { useEffect, useState } from 'react'
import { StatementSection } from './sections/StatementSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { ExhibitionsSection } from './sections/ExhibitionsSection'
import { PressSection } from './sections/PressSection'
import { LabSection } from './sections/LabSection'
import { NewsSection } from './sections/NewsSection'
import { AboutSection } from './sections/AboutSection'

/**
 * Total height of one cycle in vh.
 * This should match document.body.style.minHeight set in App.tsx.
 */
export const CYCLE_VH = 3240

/**
 * Adjust scrollTop (in vh) to control when each section appears
 * within one cycle of the 3240vh scrollable space.
 */
const SECTION_CONFIG = [
    { component: StatementSection, scrollTop: 160 },
    { component: ProjectsSection, scrollTop: 680 },
    { component: ExhibitionsSection, scrollTop: 1140 },
    { component: PressSection, scrollTop: 1600 },
    { component: LabSection, scrollTop: 2060 },
    { component: NewsSection, scrollTop: 2520 },
    { component: AboutSection, scrollTop: 2980 },
]

/** How many cycles to seed on first render */
const INITIAL_CYCLES = 3

interface ScrollContentProps {
    visible: boolean
}

export function ScrollContent({ visible }: ScrollContentProps) {
    const [cycles, setCycles] = useState(INITIAL_CYCLES)

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
                SECTION_CONFIG.map(({ component: SectionComp, scrollTop }, i) => (
                    <SectionComp
                        key={`${cycleIndex}-${i}`}
                        scrollTop={scrollTop + cycleIndex * CYCLE_VH}
                    />
                ))
            )}
        </div>
    )
}
