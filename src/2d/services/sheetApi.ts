import Papa from 'papaparse'
import type { PortfolioItem, StatementEntry, PhotosEntry, AboutEntry } from '../sectionTypes'

const URLS = {
    selected: import.meta.env.VITE_SELECTED_DATA_URL,
    statement: import.meta.env.VITE_STATEMENT_DATA_URL,
    projects: import.meta.env.VITE_PROJECTS_DATA_URL,
    exhibitions: import.meta.env.VITE_EXHIBITIONS_DATA_URL,
    photos: import.meta.env.VITE_PHOTOS_DATA_URL,
    press: import.meta.env.VITE_PRESS_DATA_URL,
    bespoke: import.meta.env.VITE_BESPOKE_DATA_URL,
    news: import.meta.env.VITE_NEWS_DATA_URL,
    about: import.meta.env.VITE_ABOUT_DATA_URL,
}

export interface SelectedData {
    projects: number[]
    exhibitions: number[]
    press: number[]
    photos: string[]
}

export interface PortfolioData {
    selected: SelectedData
    statement: StatementEntry
    projects: PortfolioItem[]
    exhibitions: PortfolioItem[]
    photos: PhotosEntry[]
    press: PortfolioItem[]
    bespoke: PortfolioItem[]
    news: PortfolioItem[]
    about: AboutEntry
}

async function fetchCsvAsJson<T>(url: string): Promise<T[]> {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Failed to fetch CSV from ${url}`)
    }
    const csvText = await response.text()

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error("PapaParse errors:", results.errors)
                }
                resolve(results.data as T[])
            },
            error: (err: any) => reject(err)
        })
    })
}

/** Helper to generate slugs from titles for ID usage */
function createId(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/** Parses common portfolio item fields */
function parsePortfolioRow(row: any): PortfolioItem {
    return {
        id: row.id || createId(row.title),
        title: row.title || '',
        year: row.year || '',
        date: row.date || '',
        type: row.type || '',
        material: row.material || '',
        size: row.size || '',
        city: row.city || '',
        venue: row.venue || '',
        introduction: row.introduction || '',
        description: row.description || '',
        image: row.image || '',
        images: row.images ? row.images.split('\n').map((u: string) => u.trim()).filter(Boolean) : [],
        photoby: (row.photoby || '').split(',').map((u: string) => u.trim()).filter(Boolean),
        illustration: row.illustration || undefined,
        link: row.link || undefined
    }
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
    const [
        selectedRaw,
        statementRaw,
        projectsRaw,
        exhibitionsRaw,
        photosRaw,
        pressRaw,
        bespokeRaw,
        newsRaw,
        aboutRaw
    ] = await Promise.all([
        fetchCsvAsJson<any>(URLS.selected),
        fetchCsvAsJson<any>(URLS.statement),
        fetchCsvAsJson<any>(URLS.projects),
        fetchCsvAsJson<any>(URLS.exhibitions),
        fetchCsvAsJson<any>(URLS.photos),
        fetchCsvAsJson<any>(URLS.press),
        fetchCsvAsJson<any>(URLS.bespoke),
        fetchCsvAsJson<any>(URLS.news),
        fetchCsvAsJson<any>(URLS.about)
    ])

    // Skip the first row of selected Raw since it's informational text
    const selectedDataRows = selectedRaw.slice(1);
    const parseIndex = (index: number) => index - 3;

    const selected: SelectedData = {
        projects: selectedDataRows.map(r => parseInt(r.projects)).filter(n => !isNaN(n)).map(parseIndex),
        exhibitions: selectedDataRows.map(r => parseInt(r.exhibitions)).filter(n => !isNaN(n)).map(parseIndex),
        press: selectedDataRows.map(r => parseInt(r.press)).filter(n => !isNaN(n)).map(parseIndex),
        photos: selectedDataRows.map(r => r.photos?.trim()).filter(Boolean)
    }

    // Process portfolio arrays
    const projects = projectsRaw.map(parsePortfolioRow).slice(1)
    const exhibitions = exhibitionsRaw.map(parsePortfolioRow).slice(1)
    const bespoke = bespokeRaw.map(parsePortfolioRow).slice(1)
    const press = pressRaw.map(parsePortfolioRow).slice(1)
    const news = newsRaw.map(parsePortfolioRow).slice(1)


    const statement = {
        quote: statementRaw[1].quote,
        body: statementRaw[1].body,
        year: statementRaw[1].year
    };

    const photos = photosRaw.map(row => ({
        alt: row.alt,
        x: row.x,
        y: row.y,
        z: row.z,
        scale: row.scale,
        image: row.image
    })).slice(1)

    const about = {
        bio: aboutRaw[1].bio,
        image: aboutRaw[1].image,
        cv: aboutRaw[1].cv,
        email: aboutRaw[1].email,
        socialType: aboutRaw[1].socialType,
        socialLink: aboutRaw[1].socialLink
    };

    // "last 5 news" usually implies chronological reversal if the end of spreadsheet is latest
    const last5News = news.slice(-5).reverse()

    return {
        selected,
        statement,
        projects,
        exhibitions,
        photos,
        press,
        bespoke,
        news: last5News,
        about
    }
}
