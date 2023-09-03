export class HtmlSelector implements Selector {
    GetLink(parent: Element, query: string): string {
        const elem = parent.querySelector<HTMLAnchorElement>(query)
        return elem?.href!;
    }
    GetImages(parent: Element, query: string): string {
        const elem = parent.querySelector<HTMLImageElement>(query)
        return elem?.src!;
    }
    GetText(parent: Element, query: string): string {
        const elem = parent.querySelector<HTMLParagraphElement>(query)
        return elem?.textContent!;
    }
    Fetch(query: string): NodeListOf<Element> {
        return document.querySelectorAll(query);
    }
}
