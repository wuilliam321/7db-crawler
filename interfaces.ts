interface Crawler {
    ImageURL(e: Element): string
    Type(e: Element): string
    Description(e: Element): string
    Brand(e: Element): string
    Size(e: Element): string
    Color(e: Element): string
    Price(e: Element): string
    Link(e: Element): string
    OrderLink(e: Element): string
    BuildRow(): string[]
}

interface Selector {
    GetImages(parent: Element, query: string): string
    GetText(parent: Element, query: string): string
    GetLink(parent: Element, query: string): string
    Fetch(query: string): NodeListOf<Element>
}

