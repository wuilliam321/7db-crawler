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

export class FashionNova implements Crawler {
    private url: string;

    constructor(private orderId: string, private selector: Selector) {
        if (!selector) {
            selector = new HtmlSelector();
        }
        this.url = "https://www.fashionnova.com/account/orders/";
    }
    ImageURL(e: Element): string {
        const item = this.selector.GetImages(e, ".account-order__line-item-image");
        return `=IMAGE("${item}")`;
    }
    Type(_e: Element): string {
        return "";
    }
    Description(e: Element): string {
        const text = this.selector.GetText(e, ".account-order__line-item-title");
        const s = text.split(" - ");
        if (s.length < 2) {
            return "";
        }
        return s[0];
    }
    Brand(_e: Element): string {
        return "FashionNova";
    }
    Size(e: Element): string {
        const item = this.selector.GetText(e, ".account-order__line-item-option");
        return item.replace("Size: ", "");
    }
    Color(e: Element): string {
        const text = this.selector.GetText(e, ".account-order__line-item-title");
        const s = text.split(" - ");
        if (s.length < 2) {
            return "";
        }
        return s[1];
    }
    Price(e: Element): string {
        const text = this.selector.GetText(e, ".account-order__line-item-price");
        return text.replace("$", "");
    }
    Link(e: Element): string {
        const text = this.selector.GetLink(e, ".account-order__line-item-link");
        let item = text;
        if (!item) {
            item = "";
        }
        return item;
    }
    OrderLink(_e: Element): string {
        return this.url + this.orderId;
    }
    BuildRow(): string[] {
        const elements = this.selector.Fetch(".account-order__line-item");
        const rows = [] as string[];
        elements.forEach((e) => {
            rows.push(`\t`
                + `${this.ImageURL(e)}\t${this.Type(e)}\t${this.Description(e)}\t`
                + `${this.Brand(e)}\t${this.Size(e)}\t${this.Color(e)}\t`
                + `${this.Price(e)}\t\t\t\t\t\t`
                + `${this.OrderLink(e)}\t${this.Link(e)}\n`
            );
        });
        return rows;
    }
}

// const c = new FashionNova("order-id", new HtmlSelector());
