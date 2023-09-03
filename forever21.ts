class HtmlSelector implements Selector {
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

export class Forever21 implements Crawler {
    private url: string;

    constructor(private orderId: string, private selector: Selector) {
        if (!selector) {
            selector = new HtmlSelector();
        }
        this.url = `https://www.forever21.com/on/demandware.store/Sites-forever21-Site/`
            + `en_US/Order-Details?orderID=${this.orderId}&orderFilter=`;
    }
    ImageURL(e: Element): string {
        let item = this.selector.GetImages(e, "img.product-line-item__image");
        if (!item) {
            item = "";
        }
        return `=IMAGE("${item}")`;
    }
    Type(e: Element): string {
        return "";
    }
    Description(e: Element): string {
        let item = this.selector.GetText(e, ".product-line-item__name.link");
        if (!item) {
            item = "";
        }
        return item.trim();
    }
    Brand(e: Element): string {
        return "Forever21";
    }
    Size(e: Element): string {
        let item = this.selector.GetText(e, "[data-line-item-component='size']");
        if (!item) {
            item = "";
        }
        return item.replace(/\n|\r|\t|\'/g, "").replace("Size:", "");
    }
    Color(e: Element): string {
        let item = this.selector.GetText(e, "[data-line-item-component='color']");
        if (!item) {
            item = "";
        }
        return item.replace(/\n|\r|\t|\'/g, "").replace("Color:", "");
    }
    Price(e: Element): string {
        let item = this.selector.GetText(e, "[data-line-item-component='price-total']");
        if (!item) {
            return "";
        }
        let cleanPrice = item.replace(/\n|\r|\t|\'/g, "").trim();
        let priceParts = cleanPrice.split("$");
        if (cleanPrice.length < 2) {
            return item.replace("$", "");
        }
        if (priceParts.length === 3) {
            return priceParts[1];
        }
        return priceParts[1];
    }
    Link(e: Element): string {
        let item = this.selector.GetLink(e, ".product-line-item__name.link");
        if (!item) {
            item = "";
        }
        return item;
    }
    OrderLink(e: Element): string {
        return this.url;
    }
    BuildRow(): string[] {
        const rows = [] as string[];
        const elements = this.selector.Fetch(".product-line-item--order");
        elements.forEach((e) => {
            rows.push(`\t`
                + `${this.ImageURL(e)}\t${this.Type(e)}\t${this.Description(e)}\t`
                + `${this.Brand(e)}\t${this.Size(e)}\t${this.Color(e)}\t`
                + `${this.Price(e)}\t\t\t\t\t\t`
                + `${this.OrderLink(e)}\t${this.Link(e)}\n`
            );
        })
        return rows;
    }
}

// const c = new Forever21("order-id", new HtmlSelector());
// console.log(c.BuildRow().join(""))
