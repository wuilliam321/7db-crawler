export class Forever21 implements Crawler {
    private url: string;
    private index = 0;
    private size = 1;

    constructor(private orderId: string, private selector: Selector) {
        this.url = `https://www.forever21.com/on/demandware.store/Sites-forever21-Site/`
            + `en_US/Order-Details?orderID=${orderId}&orderFilter=`;
    }
    updateSize() {
        this.index = 0;
        const count = this.selector.GetImages(".product-line-item__image").length;
        this.size = count;
    }
    ImageURL(): string {
        const items = this.selector.GetImages(".product-line-item__image");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return `=IMAGE("${item}")`;
    }
    Type(): string {
        return "";
    }
    Description(): string {
        const items = this.selector.GetText(".product-line-item__name.link");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return item.trim();
    }
    Brand(): string {
        return "Forever21";
    }
    Size(): string {
        const items = this.selector.GetText("[data-line-item-component='size']");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return item.replace(/\n|\r|\t|\'/g, "").replace("Size:", "");
    }
    Color(): string {
        const items = this.selector.GetText("[data-line-item-component='color']");
        let item = items[this.index];
        if (!item) {
            item = "";
        }
        return item.replace(/\n|\r|\t|\'/g, "").replace("Color:", "");
    }
    Price(): string {
        const items = this.selector.GetText("[data-line-item-component='price-total']");
        const item = items[this.index];
        if (!item) {
            return "";
        }
        let cleanPrice = item.replace(/\n|\r|\t|\'/g, "").trim();
        let priceParts = cleanPrice.split("$");
        if (cleanPrice.length < 2) {
            return items[this.index].replace("$", "");
        }
        if (priceParts.length === 3) {
            return priceParts[2];
        }
        return priceParts[1];
    }
    Link(): string {
        const texts = this.selector.GetLink(".product-line-item__name.link");
        let item = texts[this.index];
        if (!item) {
            item = "";
        }
        return item;
    }
    OrderLink(): string {
        return this.url;
    }
    BuildRow(): string[] {
        this.updateSize();
        const rows = [] as string[];
        while (this.index < this.size) {
            rows.push(`\t`
                + `${this.ImageURL()}\t${this.Type()}\t${this.Description()}\t`
                + `${this.Brand()}\t${this.Size()}\t${this.Color()}\t`
                + `${this.Price()}\t\t\t\t\t`
                + `${this.OrderLink()}\t${this.Link()}\n`
            );
            this.index++;
        }
        return rows;
    }
}

// const c = new Forever21("order-id", new HtmlSelector());
