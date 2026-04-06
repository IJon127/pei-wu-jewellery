import { useState, useEffect } from 'react'
import { fetchPortfolioData, type PortfolioData } from '../2d/services/sheetApi'

export function usePortfolioData() {
    const [data, setData] = useState<PortfolioData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function load() {
            try {
                const result = await fetchPortfolioData()
                if (isMounted) {
                    setData(result)
                    setIsLoading(false)
                }
            } catch (err: any) {
                if (isMounted) {
                    console.error('Failed to load portfolio data', err)
                    setError(err.message || 'Unknown error occurred')
                    setIsLoading(false)
                }
            }
        }

        load()

        return () => {
            isMounted = false
        }
    }, [])

    return { data, isLoading, error }
}
