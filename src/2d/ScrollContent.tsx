import { StatementSection }   from './sections/StatementSection'
import { ProjectsSection }    from './sections/ProjectsSection'
import { ExhibitionsSection } from './sections/ExhibitionsSection'
import { PressSection }       from './sections/PressSection'
import { LabSection }         from './sections/LabSection'
import { NewsSection }        from './sections/NewsSection'
import { AboutSection }       from './sections/AboutSection'

/**
 * Adjust scrollTop (in vh) to control when each section appears
 * relative to the 3240vh scrollable space.
 */
const SECTION_CONFIG = [
    { component: StatementSection,   scrollTop: 200  },
    { component: ProjectsSection,    scrollTop: 680  },
    { component: ExhibitionsSection, scrollTop: 1140 },
    { component: PressSection,       scrollTop: 1600 },
    { component: LabSection,         scrollTop: 2060 },
    { component: NewsSection,        scrollTop: 2520 },
    { component: AboutSection,       scrollTop: 2980 },
]

interface ScrollContentProps {
    visible: boolean
}

export function ScrollContent({ visible }: ScrollContentProps) {
    if (!visible) return null

    return (
        <div className="scroll-content">
            {SECTION_CONFIG.map(({ component: SectionComp, scrollTop }, i) => (
                <SectionComp key={i} scrollTop={scrollTop} />
            ))}
        </div>
    )
}
