export { }

declare global {
    interface JobDto {
        name: string,
        company: string,
        details: string,
        dateFrom: Date,
        dateTo: Date
    }
}