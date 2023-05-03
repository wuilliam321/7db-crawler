export class HtmlSelector implements Selector {
    GetLink(query: string): string[] {
        const links = [] as string[];
        const elements = document.querySelectorAll<HTMLAnchorElement>(query)
        elements.forEach(e => links.push(e.href))
        return links;
    }
    GetImages(query: string): string[] {
        const images = [] as string[];
        const elements = document.querySelectorAll<HTMLImageElement>(query)
        elements.forEach(e => images.push(e.src))
        return images;
    }
    GetText(query: string): string[] {
        const texts = [] as string[];
        const elements = document.querySelectorAll<HTMLParagraphElement>(query)
        elements.forEach(e => texts.push(e.textContent!))
        return texts;
    }
}
