interface Crawler {
    ImageURL(): string
    Type(): string
    Description(): string
    Brand(): string
    Size(): string
    Color(): string
    Price(): string
    Link(): string
    OrderLink(): string
    BuildRow(): string[]
}

interface Selector {
    GetImages(query: string): string[]
    GetText(query: string): string[]
    GetLink(query: string): string[]
}

