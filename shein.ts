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

export class Shein implements Crawler {
    private url: string;
    // map from size to color
    private sizes: { [key: string]: string } = {
        "2": "XS",
        "4": "S",
        "6": "M",
        "8/10": "L",
        "8": "L",
        "12": "0XL",
    };

    constructor(private orderId: string, private selector: Selector) {
        if (!selector) {
            selector = new HtmlSelector();
        }
        this.url = `https://us.shein.com/user/orders/detail/` + this.orderId;
    }
    ImageURL(e: Element): string {
        let item = this.selector.GetImages(e, ".crop-image-container img");
        if (!item) {
            item = "";
        }
        return `=IMAGE("${item}")`;
    }
    Type(e: Element): string {
        return "";
    }
    Description(e: Element): string {
        let item = this.selector.GetText(e, ".goods-info a");
        if (!item) {
            item = "";
        }
        return item.replace("SHEIN", "").trim();
    }
    Brand(e: Element): string {
        return "Shein";
    }
    Size(e: Element): string {
        let item = this.selector.GetText(e, ".size-info");
        if (!item) {
            return "";
        }
        let parts = item.split("/");
        if (parts.length == 1) {
            return "";
        }
        if (parts.length > 2) {
            let unmapped = parts[1] + "/" + parts[2];
            let size = this.sizes[unmapped];
            return size ? size : unmapped;
        }
        let unmapped = parts[1];
        let size = this.sizes[unmapped];
        return size ? size : unmapped;
    }
    Color(e: Element): string {
        let item = this.selector.GetText(e, ".size-info");
        if (!item) {
            return "";
        }
        let parts = item.split("/");
        return parts[0];
    }
    Price(e: Element): string {
        let item = this.selector.GetText(e, ".struct-price__dis");
        if (!item) {
            return "";
        }
        return item.replace("$", "").trim();
    }
    Link(e: Element): string {
        let item = this.selector.GetLink(e, ".goods-info a");
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
        const elements = this.selector.Fetch(".new-order-table tr");
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

// const c = new Shein("order-id", new HtmlSelector());

